package tech.easychain.incubator.greentrust.iotgateway;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RestData implements Comparable<RestData> {

	// {"timestamp": 1557928500.0, "id": 2, "pwr_avg": 339.1, "wind_spd": 0.2, "t":
	// 1.4, "insolation": 463.0}

	private Long timestamp;
	private String id;

	@JsonProperty(value = "pwr_avg")
	private double powerAvg;

	@JsonProperty(value = "wind_spd")
	private double windSpeed;

	private double t;

	private double insolation;

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public double getPowerAvg() {
		return powerAvg;
	}

	public void setPowerAvg(double powerAvg) {
		this.powerAvg = powerAvg;
	}

	public double getWindSpeed() {
		return windSpeed;
	}

	public void setWindSpeed(double windSpeed) {
		this.windSpeed = windSpeed;
	}

	public double getT() {
		return t;
	}

	public void setT(double t) {
		this.t = t;
	}

	public double getInsolation() {
		return insolation;
	}

	public void setInsolation(double insolation) {
		this.insolation = insolation;
	}

	@Override
	public String toString() {
		return "RestData [timestamp=" + timestamp + ", id=" + id + ", powerAvg=" + powerAvg + ", windSpeed=" + windSpeed
				+ ", t=" + t + ", insolation=" + insolation + "]";
	}

	@Override
	public int compareTo(RestData o) {
		return this.timestamp.compareTo(o.timestamp);
	}
}
