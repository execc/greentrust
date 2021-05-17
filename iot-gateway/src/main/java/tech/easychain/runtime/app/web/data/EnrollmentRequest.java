package tech.easychain.runtime.app.web.data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class EnrollmentRequest {

	@NotNull
	@NotEmpty
	private String password;

	@NotNull
	@NotEmpty
	private String org;

	@NotNull
	@NotEmpty
	private String msp;

	private String userName;
	private String userSurName;
	private String userLastName;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getOrg() {
		return org;
	}

	public void setOrg(String org) {
		this.org = org;
	}

	public String getMsp() {
		return msp;
	}

	public void setMsp(String msp) {
		this.msp = msp;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserSurName() {
		return userSurName;
	}

	public void setUserSurName(String userSurName) {
		this.userSurName = userSurName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}
}
