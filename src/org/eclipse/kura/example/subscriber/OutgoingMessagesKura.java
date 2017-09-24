package org.eclipse.kura.example.subscriber;

import org.json.JSONArray;
import org.json.JSONObject;

public class OutgoingMessagesKura {
	
	
	public JSONArray devRemoval(int index, JSONArray devicelist) {
		CoapClientKura coapClient = new CoapClientKura();
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
		coapClient.coapClientKura(removal);
		return devicelist;
	}
	//deactivate the device
	public void devDeact(int index, JSONArray devicelist) {
		CoapClientKura coapClient = new CoapClientKura();
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
		coapClient.coapClientKura(deact);
		return;
		
	}
	
	//send a keepAlive message to node with specified ID
	public void sendKeep(int index, JSONArray devicelist) {
		CoapClientKura coapClient = new CoapClientKura();
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
		coapClient.coapClientKura(keepAlive);
		return;
		
		
	}
}
