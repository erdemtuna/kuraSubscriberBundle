package org.eclipse.kura.example.subscriber;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.util.HashMap;
import java.util.Objects;
import java.util.Random;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//CoAP libraries
import org.eclipse.californium.core.CoapClient;
import org.eclipse.californium.core.CoapResponse;
import org.eclipse.californium.core.Utils;
import org.eclipse.californium.core.coap.MediaTypeRegistry;
import org.eclipse.californium.core.network.EndpointManager;
import org.eclipse.californium.core.network.interceptors.MessageTracer;
//
@SuppressWarnings("serial")
public final class StatusServlet extends HttpServlet {
	private static final Logger s_logger = LoggerFactory.getLogger(StatusServlet.class);
	private static final Random r = new Random();
	private static int index = 0;
	
	
	static JSONArray devicelist = new JSONArray();
// 	http://stackoverflow.com/questions/2010990/how-do-you-return-a-json-object-from-a-java-servlet
	public StatusServlet() {
		index++;
		s_logger.info("status servlet index number is " + index);
		
	}
	
	public void jsonHandle(JSONObject raw) {
		IncomingMessagesKura incomingMessagesKura = new IncomingMessagesKura();
		String type = raw.getString("Type");
		String ID = raw.getJSONObject("Content").getString("ID");
		boolean IDregCheck = IDregCheck(ID);
		boolean typeCheck = typeCheck(type);
		
		if(IDregCheck == typeCheck) {
			//Message Type: Removal
			if(Objects.equals(type, "Removal")) {
				s_logger.info("Device with ID " + raw.getJSONObject("Content").getString("ID") + " answered to removal message and is no longer registered to system.");
			}
			else {
			s_logger.info("Device is either registered and sent a duplicate registration message or not registered and sent a message with type other than registration.");
			}
		}
		
		
		//Device is either not registered and sent a registration message or registered and sent a message with type other than registration.
		else {
			
			//Message Type: Registration
			if(Objects.equals(type, "Registration")) {
				//pass "Content" object of the JSON to related function
				devicelist = incomingMessagesKura.regDevice(raw.getJSONObject("Content"), devicelist);
				s_logger.info("Registration of the new device is done.");
			}
			//Message Type: Output
			else if(Objects.equals(type, "Output")) {
				//pass "Content" object of the JSON to related function
				devicelist = incomingMessagesKura.outputDevice(raw.getJSONObject("Content"), devicelist);
				s_logger.info("New output is arrived.");
			}
			//Message Type: KeepAlive
			else if(Objects.equals(type, "KeepAlive")) {
			    //pass "Content" object of the JSON to related function
				devicelist = incomingMessagesKura.keepDevice(raw.getJSONObject("Content"), devicelist);
				s_logger.info("keepAlive message is arrived.");
			}
			//Message Type: Update
			else if(Objects.equals(type, "Update")) {
				//pass "Content" object of the JSON to related function
				devicelist = incomingMessagesKura.regDevice(raw.getJSONObject("Content"), devicelist);
				s_logger.info("Update message is arrived.");
			}
			//Message Type: Deactivation
			else if(Objects.equals(type, "Deactivation")) {
				//pass "Content" object of the JSON to related function
				devicelist = incomingMessagesKura.deactDevice(raw.getJSONObject("Content"), devicelist);
				s_logger.info("Deactivation message is arrived.");
			}
			
		}
		
		return;
	}
	// Check if incoming ID is registered
	public boolean IDregCheck(String ID) {
		boolean IDexists = false;
		for (int i = 0; i < devicelist.length(); ++i) {
			if(Objects.equals(devicelist.getJSONObject(i).getString("ID"), ID)) {
				IDexists = true;
			}
		}
		return IDexists;
	}
	//Check if incoming message has type : Registration
	public boolean typeCheck(String type) {
		boolean regMsg = false;
		if(Objects.equals("Registration",type)){
    		regMsg = true;
		}
		return regMsg;
	}
/*
	//Update registered devices
	public void regDevice(JSONObject rawContent) {
		//JSONObject with the device ID,123765, is created
		//"ID" is the main and only key of the JSONObject info1
		//----------info1.put("ID", rawContent.getJSONObject("GeneralDescription").getString("ID"));
		//Building inside the "ID"
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("Model", rawContent.getJSONObject("GeneralDescription").getString("Model"));
		jsonObj.put("DeploymentDate", rawContent.getJSONObject("GeneralDescription").getString("DeploymentDate"));
		jsonObj.put("Location", rawContent.getJSONObject("Location"));
		jsonObj.put("ConnectedDevice",rawContent.getJSONObject("Connectivity").getString("ConnectedDevice"));
		jsonObj.put("ID",rawContent.getString("ID"));
		jsonObj.put("DeviceIP",rawContent.getJSONObject("Connectivity").getString("DeviceIP"));
		jsonObj.put("lowpanIP",rawContent.getJSONObject("Connectivity").getString("lowpanIP"));
		jsonObj.put("Status","Active");
		//Put jsonObj into 123765
		devicelist.put(jsonObj);
		s_logger.info("An updated JSON: " + devicelist.toString());
			
	}
	//Update keepAlive devices
	public void keepDevice(JSONObject rawContent) {
		for (int i = 0; i < devicelist.length(); ++i) {
		    if(Objects.equals(devicelist.getJSONObject(i).getString("ID"), rawContent.getString("ID"))){
		    	devicelist.getJSONObject(i).put("AliveDate", rawContent.getString("AliveDate"));
		    	devicelist.getJSONObject(i).put("Output", rawContent.getString("Output"));
		    	devicelist.getJSONObject(i).put("Status","Active");
		    	devicelist.getJSONObject(i).remove("DeactDate");
		    }
		}
		s_logger.info("A JSON object is updated with a KeepAlive message. The updated JSON is: " + devicelist.toString());
	}
	//Update the Status of the Device as deactive
	public void deactDevice(JSONObject rawContent) {
		for (int i = 0; i < devicelist.length(); ++i) {
		    if(Objects.equals(devicelist.getJSONObject(i).getString("ID"), rawContent.getString("ID"))){
		    	devicelist.getJSONObject(i).put("Status","Deactive");
		    	devicelist.getJSONObject(i).put("DeactDate", rawContent.getString("DeactDate"));
		    	devicelist.getJSONObject(i).remove("AliveDate");
		    }
		}
		s_logger.info("A JSON object is updated with a Deactivation message. The updated JSON is: " + devicelist.toString());
	}
	//Update the properties of the registered devices
	public void upRegDevice(JSONObject rawContent) {}

	//Update the output value
	public void outputDevice(JSONObject rawContent) {
		int a=0;
		for (int i = 0; i < devicelist.length(); ++i) {
		    if(Objects.equals(devicelist.getJSONObject(i).getString("ID"), rawContent.getString("ID"))){
		    	devicelist.getJSONObject(i).put("Output", rawContent.getString("Output"));
		    	a=i;
		    }
		}
		s_logger.info("A JSON object is updated with an Output message. The updated JSON is: " + devicelist.getJSONObject(a).toString());
	}
*/
	
	
	public final void doGet(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/json");
        s_logger.info("req.getRequestURI(): {}", request.getRequestURI());
        s_logger.info("req.getRequestURL(): {}", request.getRequestURL());
    	s_logger.info(request.getParameter("action"));
    	s_logger.info(request.getParameter("deviceID"));
    	
    	String getParameter = request.getParameter("action");
    	OutgoingMessagesKura outgoingMessagesKura = new OutgoingMessagesKura(); 
    	//action type : removal
        if(Objects.equals(getParameter, "Removal")) {
        	for (int index = 0; index < devicelist.length(); ++index) {
    		    if(Objects.equals(devicelist.getJSONObject(index).getString("ID"),request.getParameter("deviceID"))){
    		    	s_logger.info("Removal request from KURAwebUI is detected.");
    		    	outgoingMessagesKura.devRemoval(index,devicelist);
    		    }
    		}
        }
        //action type : KeepAlive
        else if(Objects.equals(getParameter, "KeepAlive")) {
        	for (int index = 0; index < devicelist.length(); ++index) {
    		    if(Objects.equals(devicelist.getJSONObject(index).getString("ID"),request.getParameter("deviceID"))){
    		    	s_logger.info("KeepAlive request from KURAwebUI is detected.");
    		    	outgoingMessagesKura.sendKeep(index,devicelist);
    		    }
    		}
        }
        //action type : Deactivation
        else if(Objects.equals(getParameter, "Deactivation")) {
        	for (int index = 0; index < devicelist.length(); ++index) {
    		    if(Objects.equals(devicelist.getJSONObject(index).getString("ID"),request.getParameter("deviceID"))){
    		    	s_logger.info("Deactivation request from KURAwebUI is detected.");
    		    	outgoingMessagesKura.devDeact(index,devicelist);
    		    }
    		}
        }
        
		PrintWriter out = null;
		HashMap<String,Object> map = new HashMap<>();
		/*
		map.put("Helloooooo", "World");
		map.put("EnjoyLevel", r.nextInt(50));
		*/
		try {
			out = response.getWriter();
		} catch (IOException e) {
			s_logger.error("Servlet Error", e);
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}
		// Assuming your json object is **jsonObject**, perform the following, it will return your json object
		
		JSONObject d2 = new JSONObject("{\"Type\":\"Registration\",\"Content\":{\"ObjectType\":\"Sensor\",\"GeneralDescription\":{\"ID\":1234567, \"Model\":\"DHT11\",\"Manufacturer\":\"Adafruit\",\"CanMeasure\":{\"Temp\":\"Celcius\",\"Hum\":\"Percent\"},\"DeploymentDate\":\"21.03.2018\"},\"Location\":{\"Latitude\":52.5155,\"Longitude\":13.4062},\"Connectivity\":{\"ConnectedDevice\":\"RaspberryPi3\",\"OS\":\"Raspbian\",\"Distro\":\"Debian8\",\"DeviceIP\":\"\",\"Url\":\"\"},\"Specifications\":{\"General\":{\"VoltageInput\":\"3to5V\",\"OutputType\":\"Digital\",\"MaxCurrent\":\"2.5mA\",\"PINs\":[\"Gnd\",\"Vcc\",\"Data\"],\"MaxFreq\":\"1Hz\"},\"Limitations\":{\"Temp\":{\"Min\":0,\"Max\":50,\"Acc\":\"pm2\"},\"Hum\":{\"Min\":20,\"Max\":90,\"Acc\":\"%5\"}}}}}");
		JSONArray ja = new JSONArray();
		
		
		ja.put(d2);
		
		out.print(devicelist.toString());
		out.flush();
	}
/*
	//remove the device from network
	public void devRemoval(int index) {
		JSONObject removal= new JSONObject("{\"Type\":\"Removal\",\"Content\":{\"ObjectType\":\"Sensor\",\"ID\":\"\",\"DeviceIP\":\"\",\"lowpanIP\":\"\"}}");
		//get the ID of the device to be removed
		String ID = devicelist.getJSONObject(index).getString("ID");
		String DeviceIP = devicelist.getJSONObject(index).getString("DeviceIP");
		String lowpanIP = devicelist.getJSONObject(index).getString("lowpanIP");
		//put ID of the device to the removal message content
		removal.getJSONObject("Content").put("ID", ID);
		removal.getJSONObject("Content").put("DeviceIP", DeviceIP);
		removal.getJSONObject("Content").put("lowpanIP", lowpanIP);
		//remove the registration of the device from /api/status
		devicelist.remove(index);
		//pass removal JSONObject to the CoAP
		CoapClientKura coapClient = new CoapClientKura(removal);
		
	}
	//deactivate the device
	public void devDeact(int index) {
		JSONObject deact= new JSONObject("{\"Type\":\"Deactivation\",\"Content\":{\"ObjectType\":\"Sensor\",\"ID\":\"\",\"DeviceIP\":\"\",\"lowpanIP\":\"\",\"DeactDate\":\"\"}}");
		//get the ID of the device to be deactivated
		String ID = devicelist.getJSONObject(index).getString("ID");
		String DeviceIP = devicelist.getJSONObject(index).getString("DeviceIP");
		String lowpanIP = devicelist.getJSONObject(index).getString("lowpanIP");
		//put ID of the device to the deactivation message content
		deact.getJSONObject("Content").put("ID", ID);
		deact.getJSONObject("Content").put("DeviceIP", DeviceIP);
		deact.getJSONObject("Content").put("lowpanIP", lowpanIP);
		//pass deact JSONObject to the CoAP
		//coapClient(deact);
		CoapClientKura coapClient = new CoapClientKura(deact);
		
	}
	
	//send a keepAlive message to node with specified ID
	public void sendKeep(int index) {
		JSONObject keepAlive= new JSONObject("{\"Type\":\"KeepAlive\",\"Content\":{\"ID\":\"2167419\",\"AliveDate\":\"\",\"Output\":\"24.375\",\"Unit\":\"Celcius\",\"DeviceIP\":\"\",\"lowpanIP\":\"\"}}");
		//get the ID of the device to be kept alive
		String ID = devicelist.getJSONObject(index).getString("ID");
		String DeviceIP = devicelist.getJSONObject(index).getString("DeviceIP");
		String lowpanIP = devicelist.getJSONObject(index).getString("lowpanIP");
		//put ID of the device to the keepAlive message content
		keepAlive.getJSONObject("Content").put("ID", ID);
		keepAlive.getJSONObject("Content").put("DeviceIP", DeviceIP);
		keepAlive.getJSONObject("Content").put("lowpanIP", lowpanIP);
		//pass keepAlive JSONObject to the CoAP
		CoapClientKura coapClient = new CoapClientKura(keepAlive);
		//coapClient(keepAlive);
		
		
	}
*/	
}