/**
  Author: Cem Akpolat
  Data Processor is thought for processing the received data from modelapi, ownapi, or other resources.
  This can be seen as an interface between the user interface and the unstructured data recieved from backend.
 **/
// Data Processor Class
var dataProcessor=(function(){
    return {
        processDevices:function(data){},
        processLocations:function(data){},
        processProperties:function(data){}
    };
})();
     /*


    updateLocationData2: function(locations) {
      $.each(locations, function(i, location) {
              var devicesArray=[];
              $.each(deviceData, function(i, device) {
                  if(device.location==location.hashCode){
                     devicesArray.push(device.key);   
                  }else{
                     console.log("..HI..")
                  }
              });
        locationData[utils.toValidHTML(location.name)]['devices']=devicesArray;
      });
       
    },
    
    updateLocationData: function(locations) {
      $.each(locations, function(i, location) {
        locationData[utils.toValidHTML(location.name)] = {
          'name': location.name,
          'type': location.type,
          'devices':location.devices,
          'locationKey': location.hashCode,
              'hashCode': location.hashCode
        };
      });
        
       
    },
    updateDeviceDataEnvAPI:function(devices) {
      $.each(devices, function(i, device) {
        deviceData[utils.toValidHTML(device.identifier)] = {
          'location': device.location,
          'hashCode': device.hashCode
      };

      });
    }, 
    updateDeviceDataDevAPI:function(devices) {
       var deviceData2={};
       $.each(devices, function(i, device) {       
            deviceData2[utils.toValidHTML(device.identifier)] = {
          'location': deviceData[utils.toValidHTML(device.identifier)]['location'],
          'hashCode': device.hashCode
      };
            deviceData2[utils.toValidHTML(device.identifier)]['name'] = device.name;
            deviceData2[utils.toValidHTML(device.identifier)]['key'] = device.identifier;
            deviceData2[utils.toValidHTML(device.identifier)]['manufacturer'] = device.manufacturer;
            deviceData2[utils.toValidHTML(device.identifier)]['modelName'] = device.modelName;
            deviceData2[utils.toValidHTML(device.identifier)]['powerUsage'] = ModelAPIInterface.getPropertyValue(device,"powerUsage");
            deviceData2[utils.toValidHTML(device.identifier)]['properties'] = device.properties; 
       });
        deviceData=deviceData2;
    },
    getPropertyValue : function(device,identifier) {
        var value = 0;
        $.each(device.properties, function(i, property) {
            //if (property.key == 'http://iolite.de#powerUsage') {
            //console.log( 'http://iolite.de#'+identifier)
            if (property.key == 'http://iolite.de#'+identifier) {
                value = parseFloat(property.value);
                return false; // break the for each loop
            }
        });
      return value;
    }
    var utils={
      toValidHTML: function(str) {
        var toEscape = ['.', ':', ';', ' ', '_'];
        var res = '';
        for (var i = 0; i < str.length; i++) {
          var c = str[i];
          if (toEscape.indexOf(c) == -1) {
            res += c;
          } else {
            res += '-';
          }
        }
        return res;
      }
    };      

     */