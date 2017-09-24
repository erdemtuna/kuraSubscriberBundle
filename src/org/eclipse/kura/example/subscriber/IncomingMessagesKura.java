package org.eclipse.kura.example.subscriber;

import java.util.Objects;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IncomingMessagesKura {
	private static final Logger s_logger = LoggerFactory.getLogger(StatusServlet.class);
	
	public JSONArray regDevice(JSONObject rawContent, JSONArray devicelist) {
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
		return devicelist;
			
	}
	//Update keepAlive devices
	public JSONArray keepDevice(JSONObject rawContent, JSONArray devicelist) {
		for (int i = 0; i < devicelist.length(); ++i) {
		    if(Objects.equals(devicelist.getJSONObject(i).getString("ID"), rawContent.getString("ID"))){
		    	devicelist.getJSONObject(i).put("AliveDate", rawContent.getString("AliveDate"));
		    	devicelist.getJSONObject(i).put("Output", rawContent.getString("Output"));
		    	devicelist.getJSONObject(i).put("Status","Active");
		    	devicelist.getJSONObject(i).remove("DeactDate");
		    }
		}
		s_logger.info("A JSON object is updated with a KeepAlive message. The updated JSON is: " + devicelist.toString());
		return devicelist;
	}
	//Update the Status of the Device as deactive
	public JSONArray deactDevice(JSONObject rawContent, JSONArray devicelist) {
		for (int i = 0; i < devicelist.length(); ++i) {
		    if(Objects.equals(devicelist.getJSONObject(i).getString("ID"), rawContent.getString("ID"))){
		    	devicelist.getJSONObject(i).put("Status","Deactive");
		    	devicelist.getJSONObject(i).put("DeactDate", rawContent.getString("DeactDate"));
		    	devicelist.getJSONObject(i).remove("AliveDate");
		    }
		}
		s_logger.info("A JSON object is updated with a Deactivation message. The updated JSON is: " + devicelist.toString());
		return devicelist;
	}
	//Update the properties of the registered devices
	public void upRegDevice(JSONObject rawContent, JSONArray devicelist) {}

	//Update the output value
	public JSONArray outputDevice(JSONObject rawContent, JSONArray devicelist) {
		int a=0;
		for (int i = 0; i < devicelist.length(); ++i) {
		    if(Objects.equals(devicelist.getJSONObject(i).getString("ID"), rawContent.getString("ID"))){
		    	devicelist.getJSONObject(i).put("Output", rawContent.getString("Output"));
		    	a=i;
		    }
		}
		s_logger.info("A JSON object is updated with an Output message. The updated JSON is: " + devicelist.getJSONObject(a).toString());
		return devicelist;
	}

}
