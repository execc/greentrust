package tech.easychain.runtime.app.web.data;

import java.util.HashMap;
import java.util.Map;

public class FlowQueryRequest extends PageRequest {

	boolean includeCompleted;
	private String code;

	private String status;
	private String context;

	public boolean isIncludeCompleted() {
		return includeCompleted;
	}

	public void setIncludeCompleted(boolean includeCompleted) {
		this.includeCompleted = includeCompleted;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public Map<String, String> contextMap() {
		Map<String, String> result = new HashMap<>();
		if (context != null) {
			String[] split = context.split(",");
			if (split.length == 0 || split.length % 2 != 0) {
				throw new IllegalArgumentException("Invalid context param");
			}

			for (int i = 0; i < split.length - 1; i += 2) {
				result.put(split[i], split[i + 1]);
			}
		}
		return result;
	}

}
