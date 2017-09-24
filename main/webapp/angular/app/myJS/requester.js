'use strict';
/**
 Author: Cem Akpolat

**/

// Request Object For Storage API
function createStorageAPIRequestObject(deviceIdentifier, request) {
    //.. Storage API related functions
    var params;
    if (request.params.actionName = requestParams.actionNamesForStorateAPI.saveInt) {
        //...
    } else if (request.params.actionName = requestParams.actionNamesForStorateAPI.saveBoolean) {
        //...
    } else if (request.params.actionName = requestParams.actionNamesForStorateAPI.saveDouble) {
        //...
    } else if (request.params.actionName = requestParams.actionNamesForStorateAPI.saveIntList) {
        //...
    }
};
// Request Object For Device API
function createDeviceAPIRequestObject(deviceIdentifier, request) {
    var params;
    //console.debug("request",request);
    if (request.params.actionName == requestParams.actionNamesForDeviceAPI.getValuesBetween) {
        params = [new ValueParameter(request.params.starttime), new ValueParameter(request.params.endtime)];
    } else if (request.params.actionName == requestParams.actionNamesForDeviceAPI.getValuesOf) {
        params = [new ValueParameter(request.params.starttime), new ValueParameter(request.params.timeInterval)];
    } else if (request.params.actionName == requestParams.actionNamesForDeviceAPI.getAggregatedValuesSince) {
        params = [new ValueParameter(request.params.starttime), new ValueParameter(request.params.resolution), new ValueParameter(request.params.functionName)];
    } else if (request.params.actionName == requestParams.actionNamesForDeviceAPI.getAggregatedValuesBetween) {
        params = [new ValueParameter(request.params.starttime), new ValueParameter(request.params.endtime), new ValueParameter(request.params.resolution), new ValueParameter(request.params.functionName)];
    } else if (request.params.actionName == requestParams.actionNamesForDeviceAPI.getAggregatedValuesOf) {
        var currenttime = request.params.starttime;
        params = [new ValueParameter(currenttime), new ValueParameter(request.params.timeInterval), new ValueParameter(request.params.resolution), new ValueParameter(request.params.functionName)];
    } else if (request.params.actionName == requestParams.actionNamesForDeviceAPI.requestValueUpdate) {
        var value = request.params.value;
        params = [new ValueParameter(value)];
    }

    return {
        query: '/devices[identifier=\'' + deviceIdentifier + '\']/properties[key=\'' + request.params.property + '\']',
        action: request.params.actionName,
        parameters: params
    };
};

// Requester Object for sending/receiving the outputs through ModelAPI

var requester = (function() {
    return {
        isAPIsLoaded: function() {
            if (devAPI !== undefined && envAPI !== undefined && storageAPI !== undefined) {
                return true;
            }
        },
        getDevices: function(forceRequest) {
            var def = $.Deferred();
            if (devices === undefined) {
                devAPI.query({
                    request: new QueryRequest(null, null, '/devices'),
                    success: function(resp) {
                        devices = resp;
                        //console.debug("devices",devices);
                        def.resolve(devices);
                    }
                });
            } else {
                def.resolve(devices);
            }
            return def.promise();
        },
        getLocations: function() {
            var def = $.Deferred();
            if (locations === undefined) {
                envAPI.query({
                    request: new QueryRequest(null, null, '/locations'),
                    success: function(resp) {
                        locations = resp;
                        def.resolve(locations);
                    },
                    error: function() {
                        def.resolve(null);
                    }
                });
            } else {
                def.resolve(locations);
            }
            return def.promise();
        },
        getDevicesPerLocation: function() {
            var def = $.Deferred();
            if (devicesPerLocation === undefined) {
                var devicesPerLocation = {};

                var defers = [];
                var promises = [];
                requester.getLocations().then(function() {

                    locations.forEach(function() {
                        var d = $.Deferred();
                        var p = d.promise();
                        defers.push(d);
                        promises.push(p);
                    });
                    locations.forEach(function(location, index) {
                        queryString = '/locations[@identifier = \'' + location.identifier + '\']/devices/@identifier';
                        envAPI.query({
                            request: new QueryRequest(null, null, queryString),
                            success: function(resp) {
                                console.log(resp);
                                devicesPerLocation[location.identifier] = resp;
                                defers[index].resolve();
                            }
                        });
                    });

                    $.when.apply($, promises).then(function(data) { // jquery promises differs from angular
                        def.resolve(devicesPerLocation);
                    });

                });
            } else {
                def.resolve(devicesPerLocation);
            }
            return def.promise();
        },
        getHistoryForDevice: function(deviceIdentifier, request) { // deviceIdentified, request
            var def = $.Deferred();
            var requestObj = new createDeviceAPIRequestObject(deviceIdentifier, request);
            devAPI.action({
                request: new ActionRequest(null, null, requestObj.query, requestObj.action, requestObj.parameters),
                success: function(response) {
                    if (historicalData[deviceIdentifier] === undefined) {
                        historicalData[deviceIdentifier] = {};
                    }
                    if (historicalData[deviceIdentifier][request.params.property] === undefined) {
                        historicalData[deviceIdentifier][request.params.property] = {};
                    }
                    if (historicalData[deviceIdentifier][request.params.property][request.params.timeInterval] === undefined) {
                        historicalData[deviceIdentifier][request.params.property][request.params.timeInterval] = {};
                    }
                    historicalData[deviceIdentifier][request.params.property][request.params.timeInterval] = response;
                    def.resolve();
                },
                error: function(modelAPI, responseRequestID, responseErrorCode, responseError) {
                    console.error(modelAPI, responseRequestID, responseErrorCode, responseError);
                    def.reject();
                }
            });
            return def.promise();
        },
        // Message sent from IOLITE Control Tab when driver on button is clikced '{"requestID":"ActionRequest_0.5jf1c6dr56m","modelID":"http://iolite.de#Environment","class":"ActionRequest","objectQuery":"devices[id='lamp1']/properties[name='on']","actionName":"requestValueUpdate","parameters":[{"value":"false","class":"ValueParameter"}]}' for IOLITEWebSocket
      // Message sent from IOLITE App '{"requestID":"ActionRequest_0.qvivvz2a9ap","modelID":"http://iolite.de#7dc19fc1_897a_48fb_9303_9e6af8e05b9e1496263626565_scha-app.jar@de.iolite.app.api.device.impl.DeviceAPIImpl","class":"ActionRequest","objectQuery":"/devices[identifier='lamp1']/properties[key='http://iolite.de#on']","actionName":"requestValueUpdate","parameters":[{"class":"ValueParameter","value":"on"}]}'
        updateDeviceProperty: function(deviceIdentifier, request) { // deviceIdentified, request
            var def = $.Deferred();
            var requestObj = new createDeviceAPIRequestObject(deviceIdentifier, request);
            devAPI.action({
                request: new ActionRequest(null, null, requestObj.query, requestObj.action, requestObj.parameters),
                success: function(response) {
                    console.debug("update device property", response);
                    def.resolve(response);
                },
                error: function(modelAPI, responseRequestID, responseErrorCode, responseError) {
                    console.error("Error while updating device value",modelAPI, responseRequestID, responseErrorCode, responseError);
                    def.reject();
                }
            });
            return def.promise();
        },
        getGivenPropertyValueOfDevices: function(deviceIdentifier, propertyName, actionName) {},
        getPropertyForGivenDevice: function() {},
        getHistory: function(request) {
            var def = $.Deferred();
            requester.getHistoryForAllDevices(request).done(function(resp) {
                //history = $.extend( {}, history, resp );
                def.resolve(resp);
            }, function() {
                def.reject();
            });
            return def.promise();
        },
        getHistoryForAllDevices: function(request) { // request
            var def = $.Deferred();
            // First, get the identifiers of those devices which have the desired property
            var queryString = '/devices/properties[key=\'' + request.params.property + '\']/../identifier'; // request.property
            devAPI.query({
                request: new QueryRequest(null, null, queryString),
                success: function(deviceIdentifiers) {
                    // Request for each device and save promises
                    var promises = [];
                    //console.debug( deviceIdentifiers);
                    $.each(deviceIdentifiers, function(identifier) {
                        //console.debug( 'entered',deviceIdentifiers[identifier] );
                        promises.push(requester.getHistoryForDevice(deviceIdentifiers[identifier], request));
                    });
                    $.when.apply($, promises).then(function() {
                        // All promises resolved
                        console.debug('Received hisorical data for', request.params.property, 'and time interval', request.params.timeInterval);
                        //console.debug( 'entered',historicalData );
                        def.resolve(historicalData);
                    }, function() {
                        // Not all promises resolved
                        console.error('No hisorical data for', request.params.property, 'and time interval', request.params.timeInterval);
                        def.reject();
                    });
                },
                error: function(modelAPI, responseRequestID, responseErrorCode, responseError) {
                    console.error(modelAPI, responseRequestID, responseErrorCode, responseError);
                    def.reject();
                }
            });
            return def.promise();
        },
        loadRequestDataInView: function(view, request) {
            if (this.isAPIsLoaded()) {
                if (requestParams.devices.methods.getAllDevices == request.type) {
                    requester.getDevices().done(function(response) {
                        devices = response;
                        // process Data
                        console.log("devices", devices);
                        dataProcessor.processDevices(response);
                        view(response);
                    });
                } else if (requestParams.devices.methods.getDevicePerLocation == request.type) {
                    requester.getDevicesPerLocation().done(function(response) {
                        console.debug("devicesPerLocation", response);
                        dataProcessor.processDevices(response);
                        view(response);
                    });
                } else if (requestParams.locations.methods.getLocations == request.type) {
                    requester.getLocations().done(function(response) {
                        console.debug("locations", response);
                        //dataProcessor.processLocations(response);
                        view(response);
                    });
                } else if (requestParams.properties.methods.getPropOfGivenDevice == request.type) {
                    requester.getHistory(request).done(function(response) { // get only the last measurement
                        console.debug("history", response);
                        //dataProcessor.processLocations(response);
                        view(response);
                    });
                } else if (requestParams.properties.methods.getPropHistoryOfGivenDevice == request.type) {
                    requester.getHistory(request).done(function(response) { // get the history of driver
                        console.debug("history", response);
                        //dataProcessor.processLocations(response);
                        view(response);
                    });
                } else if (requestParams.properties.methods.updatePropertyValue == request.type) {
                    requester.updateDeviceProperty(request.params.device,request).done(function(response) { // get the history of driver
                        console.debug("device updated", response);
                        view(response);
                    });
                } else {
                    //... Complete with the required functions
                }
            }
        },
        getData: function(requestType, callback) {

        },
        storageAPIExample: function() {
            var def = $.Deferred();
            var $executing = $('#executing');
            var objectQuery = ".";
            var actionName = "saveInt"; //package de.iolite.app.api.storage.impl; see here to see other functions
            var parameters = [new ValueParameter("test"), new ValueParameter(1), ]; //

            storageAPI.action({
                // what should be the this in the success and error callbacks, can be anything but null
                context: this,
                // the request
                request: new ActionRequest( /* requestIdentifier */ null, /* modelIdentifier */ null, objectQuery, actionName, parameters),
                // some callback function
                success: function(value, modelAPI, request) {
                    $executing.append($("<p>").text("Action " + JSON.stringify(request) + " returned " + JSON.stringify(value)));
                    def.resolve();
                },
                // some other callback function
                error: function(modelAPI, responseRequestID, responseErrorCode, responseError) {
                    $executing.append($("<p>").text(
                        "Action " + responseRequestID + " '" + objectQuery + "' failed due to " + responseErrorCode + ": " + responseError));
                    def.reject();
                }
            });
        }
    };
})();
