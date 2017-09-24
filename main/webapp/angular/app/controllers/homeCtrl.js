'use strict';
app.controller('HomeCtrl', function ($scope) {

var request1={type:requestParams.locations.methods.getLocations};

var request5={
   type:requestParams.properties.methods.getPropHistoryOfGivenDevice,
   params:{
     device:"",
     property:requestParams.properties.propertyNames.powerUsage,
     // the rest of the parameters can be associated with the history of the device properties.
     starttime:new Date().getTime(),
     endtime:"",
     resolution:requestParams.resolution.HOUR,
     timeInterval:requestParams.timeInterval.WEEK,
     functionName:requestParams.functionNames.AVERAGE,
     actionName:requestParams.actionNamesForDeviceAPI.getAggregatedValuesOf
   }
 };
var request2={type:requestParams.devices.methods.getAllDevices};
  // requests from our own request handlers
  $scope.dbResults="DB";
  ownAPIConnector.getDBConn(function(results){
    console.debug("requester db",results);
    $scope.$apply(function(){
      $scope.dbResults = results;
    });
  });
  //
  $scope.jsonRequest="IOLITE API";
  requester.loadRequestDataInView(function(data){
     console.debug("requester response",data);
     $scope.requestResult=JSON.stringify(data);
  },request2);

  $scope.jsonRequest="JSON";
  ownAPIConnector.getJSONRequest(function(results){
    console.debug("requester json",results);
    $scope.$apply(function(){
      $scope.jsonRequest = JSON.stringify(results);
    });
  });

  $scope.htmlRequest="HTML";
  ownAPIConnector.getHTMLRequest(function(results){
    console.debug("requester html",results);
    $scope.$apply(function(){
      $scope.htmlRequest = results;
    });
  });
});
