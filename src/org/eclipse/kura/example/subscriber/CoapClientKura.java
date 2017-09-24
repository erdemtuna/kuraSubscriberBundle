package org.eclipse.kura.example.subscriber;

import java.net.URI;

import org.eclipse.californium.core.CoapClient;
import org.eclipse.californium.core.CoapResponse;
import org.eclipse.californium.core.Utils;
import org.eclipse.californium.core.coap.MediaTypeRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//CoAP libraries
import org.eclipse.californium.core.CoapClient;
import org.eclipse.californium.core.CoapResponse;
import org.eclipse.californium.core.Utils;
import org.eclipse.californium.core.coap.MediaTypeRegistry;
import org.eclipse.californium.core.network.EndpointManager;
import org.eclipse.californium.core.network.interceptors.MessageTracer;
import org.json.JSONObject;

public class CoapClientKura {
	private static final Logger s_logger = LoggerFactory.getLogger(StatusServlet.class);
	
	public void coapClientKura(JSONObject sendMessage) {
	URI uri = null; // URI parameter of the request
	
	try {
		
		uri = new URI("coap://172.24.1.138:5683/coapSD");
	} catch (Exception e) {
		System.err.println("Invalid URI: " + e.getMessage());
		//System.exit(-1);
	}
	
	CoapClient client = null;
	/*start1*/
	CoapResponse response = null;
	
	
	try {
		client = new CoapClient(uri);
		//send JSON message to CoAP server
		response = client.post(sendMessage.toString(), MediaTypeRegistry.TEXT_PLAIN);
		s_logger.info("Message is posted to CoAP server. That is: " + sendMessage.toString());
	} catch (Exception e) {
		s_logger.info("Invalid response " + e.getMessage());
		//System.exit(-1);
	}
	if (response!=null) {
		
		System.out.println(response.getCode());
		System.out.println(response.getOptions());
		s_logger.info(response.getResponseText());
		s_logger.info(" ");	
		System.out.println(System.lineSeparator() + "ADVANCED" + System.lineSeparator());
		// access advanced API with access to more details through
		// .advanced()
		System.out.println(Utils.prettyPrint(response));
	} else {
		System.out.println("No response received.");
	}
	return;
	}
}
