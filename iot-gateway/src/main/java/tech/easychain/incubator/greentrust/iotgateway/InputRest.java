package tech.easychain.incubator.greentrust.iotgateway;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InputRest {

	@Autowired
	Poller poller;

	@PostMapping
	public void receive(@RequestBody List<RestData> data) {
		System.out.println(data);

		poller.getData().addAll(data);
	}

}
