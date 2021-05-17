package tech.easychain.runtime.app.web.data;

import java.util.Date;

public class TransactionResponse<T> extends Response<T> {

	String txId;
	String channelId;
	Date timestamp;

	public String getTxId() {
		return txId;
	}

	public void setTxId(String txId) {
		this.txId = txId;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
}
