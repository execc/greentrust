package tech.easychain.runtime.app.web.data;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

public class FlowState {

	private FlowCoordinates metadata;

	private Date startTime;

	private Set<String> currentStates = new LinkedHashSet<>();

	private Date endTime;

	private String pid;

	private String ownerUser;

	private String ownerOrg;

	private Map<String, Object> context = new HashMap<>();

	public FlowCoordinates getMetadata() {
		return metadata;
	}

	public void setMetadata(FlowCoordinates metadata) {
		this.metadata = metadata;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Set<String> getCurrentStates() {
		return currentStates;
	}

	public String getCurrentState() {
		return currentStates.iterator().next();
	}

	public void setCurrentStates(Set<String> currentStates) {
		this.currentStates = currentStates;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public Map<String, Object> getContext() {
		return context;
	}

	public void setContext(Map<String, Object> context) {
		this.context = context;
	}

	public String getOwnerUser() {
		return ownerUser;
	}

	public String getOwnerOrg() {
		return ownerOrg;
	}

	public void setOwnerOrg(String ownerOrg) {
		this.ownerOrg = ownerOrg;
	}

	public void setOwnerUser(String ownerUser) {
		this.ownerUser = ownerUser;
	}
}
