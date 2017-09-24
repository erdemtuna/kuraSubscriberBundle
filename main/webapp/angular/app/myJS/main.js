'use strict';
/**
  Author: Cem Akpolat
  GUI behaves like a main function, it is called inside Model API Connecter
 **/

// gui can be represented as the main function
var gui = function () {
  console.debug("GUI started!");
  // Request Types
  var request1 = {
    type: requestParams.locations.methods.getLocations
  };

  var request2 = {
    type: requestParams.devices.methods.getAllDevices
  };

  var request3 = {
    type: requestParams.devices.methods.getDevicePerLocation
  };

  var request4 = {
    type: requestParams.properties.methods.getPropOfGivenDevice,
    params: {
      device: '',
      prop: requestParams.properties.propertyNames.powerUsage
    },
  };

  var request = {
      type:requestParams.properties.methods.updatePropertyValue,
      params:{
        device:"lamp1",
        property:requestParams.properties.propertyNames.on, // welche Attribut willst du ändern
        value:"true", // Muss string sein
        actionName:requestParams.actionNamesForDeviceAPI.requestValueUpdate // hier ist ActionName
      }
    };

  //all variables
  var request5 = {
    type: requestParams.properties.methods.getPropHistoryOfGivenDevice,
    params: {
      device: '',
      property: requestParams.properties.propertyNames.powerUsage,
      // the rest of the parameters can be associated with the history of the device properties.
      starttime: new Date().getTime(),
      endtime: '',
      resolution: requestParams.resolution.HOUR,
      timeInterval: requestParams.timeInterval.WEEK,
      functionName: requestParams.functionNames.AVERAGE,
      actionName: requestParams.actionNamesForDeviceAPI.getAggregatedValuesOf
    },
  };

  // requests from our own request handlers
  // ownAPIConnector.getDBConn(views.viewDBConn);
  // ownAPIConnector.getJSONRequest();
  // ownAPIConnector.getHTMLRequest();

  requester.loadRequestDataInView(views.view1,request);
  // requester.loadRequestDataInView(views.view1,request3);
  // requester.loadRequestDataInView(views.view1,request5);

  // update View
  //views.updateView(function(){requester.loadRequestDataInView(views.view1,request4)});
  //views.updateViewWithGivenTimeInterval(function(){
  //   requester.loadRequestDataInView(views.view1,request4)},10000)
  // ;
};

$(document).ready(function() {
  modelAPIConnector.connect(); // model api connecter con

});
