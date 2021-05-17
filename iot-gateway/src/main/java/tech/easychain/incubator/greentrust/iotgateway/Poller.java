package tech.easychain.incubator.greentrust.iotgateway;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import tech.easychain.runtime.app.web.data.AuthenticationData;
import tech.easychain.runtime.app.web.data.AuthenticationRequest;
import tech.easychain.runtime.app.web.data.CreateRequest;
import tech.easychain.runtime.app.web.data.EventRequest;
import tech.easychain.runtime.app.web.data.FlowQueryRequest;
import tech.easychain.runtime.app.web.data.FlowState;
import tech.easychain.runtime.app.web.data.PagedResponse;
import tech.easychain.runtime.app.web.data.Response;
import tech.easychain.runtime.app.web.data.TransactionResponse;

@Component
public class Poller {

	private ConcurrentSkipListSet<RestData> data = new ConcurrentSkipListSet<>();

	public ConcurrentSkipListSet<RestData> getData() {
		return data;
	}

	@Scheduled(fixedDelay = 25000)
	public void createRequestForCertificate() {
		ArrayList<RestData> localData = new ArrayList<>(data);
		data.clear();

		if (localData.size() == 0) {
			return;
		}

		int e = 0;
		for (RestData d : localData) {
			e += d.getPowerAvg();
		}

		e = e / localData.size();
		System.out.println("Produced green power: " + e);

		String pid = "2ee46560-7e45-4a1a-a4eb-72c68d0bc5ce";

		AuthenticationRequest authReq = new AuthenticationRequest();
		authReq.setLogin("admin");
		authReq.setPassword("mypass");

		String token = auth(authReq).getData().getToken();

		CreateRequest createReq = new CreateRequest();
		createReq.setCode("ClaimSM");
		TransactionResponse<FlowState> createRs = create(createReq, token);

		String claimPid = createRs.getData().getPid();

		EventRequest signalDeposit = new EventRequest();
		signalDeposit.setCode("ClaimSM");
		signalDeposit.setEvent("SignalDeposit");
		signalDeposit.setPid(claimPid);
		signalDeposit.setParameters(new HashMap<>());
		signalDeposit.getParameters().put("inTotalProduced", "150");

		event(signalDeposit, token);

		EventRequest signalSendToMC = new EventRequest();
		signalSendToMC.setCode("ClaimSM");
		signalSendToMC.setEvent("SignalSendToMC");
		signalSendToMC.setPid(claimPid);
		signalSendToMC.setParameters(new HashMap<>());
		signalSendToMC.getParameters().put("inCountEnergy", String.valueOf(e));
		signalSendToMC.getParameters().put("inIdWallet", pid);
		signalSendToMC.getParameters().put("dateStart", String.valueOf(new Date().getTime()));
		signalSendToMC.getParameters().put("dateEnd", String.valueOf(new Date().getTime()));

		event(signalSendToMC, token);

	}

	public static void main(String[] args) {
		Poller p = new Poller();
		p.pollBlockchainForUpdates();
	}

	@Scheduled(fixedDelay = 45000)
	public void pollBlockchainForUpdates() {
		AuthenticationRequest authReq = new AuthenticationRequest();
		authReq.setLogin("admin");
		authReq.setPassword("mypass");

		String token = auth(authReq).getData().getToken();

		FlowQueryRequest fqr = new FlowQueryRequest();
		fqr.setCode("ClaimSM");
		fqr.setStatus("ToVerification");

		PagedResponse<FlowState> flows = query(fqr, token);
		if (flows.getData() != null) {
			System.out.println("Found " + flows.getData().size() + " claims to veriy");
			for (FlowState state : flows.getData()) {
				EventRequest request = new EventRequest();
				request.setCode("ClaimSM");
				request.setEvent("SignalMaxCountEnergy");
				request.setPid(state.getPid());
				request.setParameters(new HashMap<String, String>());
				request.getParameters().put("maxCountEnergy", "30");

				System.out.println("Verified claim with PID: " + state.getPid());

				event(request, token);
			}
		}
	}

	public Response<AuthenticationData> auth(AuthenticationRequest req) {
		RestTemplate template = new RestTemplate();
		HttpEntity<AuthenticationRequest> httpEntity = new HttpEntity<>(req);
		return template.exchange("http://51.15.252.103:8080/public/auth", HttpMethod.POST, httpEntity,
				new ParameterizedTypeReference<Response<AuthenticationData>>() {
				}).getBody();
	}

	public TransactionResponse<FlowState> event(EventRequest req, String token) {
		RestTemplate template = new RestTemplate();
		LinkedMultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
		headers.add("Authorization", "Bearer " + token);

		HttpEntity<EventRequest> httpEntity = new HttpEntity<>(req, headers);

		return template.exchange("http://51.15.252.103:8080/event", HttpMethod.POST, httpEntity,
				new ParameterizedTypeReference<TransactionResponse<FlowState>>() {
				}).getBody();
	}

	public TransactionResponse<FlowState> create(CreateRequest req, String token) {
		RestTemplate template = new RestTemplate();
		LinkedMultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
		headers.add("Authorization", "Bearer " + token);

		HttpEntity<CreateRequest> httpEntity = new HttpEntity<>(req, headers);

		return template.exchange("http://51.15.252.103:8080/create", HttpMethod.POST, httpEntity,
				new ParameterizedTypeReference<TransactionResponse<FlowState>>() {
				}).getBody();
	}

	public PagedResponse<FlowState> query(FlowQueryRequest req, String token) {
		RestTemplate template = new RestTemplate();
		LinkedMultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
		headers.add("Authorization", "Bearer " + token);
		HttpEntity<FlowQueryRequest> httpEntity = new HttpEntity<>(req, headers);

		return template.exchange("http://51.15.252.103:8080/query?code=ClaimSM&status=ToVerification", HttpMethod.GET,
				httpEntity, new ParameterizedTypeReference<PagedResponse<FlowState>>() {
				}).getBody();
	}
}
