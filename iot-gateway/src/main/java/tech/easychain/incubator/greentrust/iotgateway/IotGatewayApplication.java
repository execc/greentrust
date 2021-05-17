package tech.easychain.incubator.greentrust.iotgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class IotGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(IotGatewayApplication.class, args);
	}

}
