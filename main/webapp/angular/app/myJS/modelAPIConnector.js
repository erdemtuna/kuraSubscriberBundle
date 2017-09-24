'use strict';
/**
 Author: Cem Akpolat
 Model API is an interface to communicate between iolite deviceAPi, storageAPi and environment API.
**/

//Global Variables
var envAPI, devAPI, storageAPI, heatingAPI;
var devices, locations, historicalData = {};

var modelAPIConnector = (function() {
  return {
    connect: function() {
      var init = $.Deferred(),
        env = $.Deferred(),
        dev = $.Deferred(),
        heating = $.Deferred(),
        str = $.Deferred();

      window.Client = {
        SID: Client.SID,
        throwErrorOnBootFailure: true,
        readyCallback: function () {
          init.resolve();
        },
      };
      init.done(function () {
        console.debug('ModelAPI client initialized');
        console.log(ModelAPIProfiles.profiles);
        // Connect to EvironmentAPI
        ModelAPIProfiles.get(ModelAPIProfiles.ContextModelId, {
          redoOnReconnect: false,
          success: function (environmentAPIModelAPI) {
            envAPI = environmentAPIModelAPI;
            env.resolve();
            console.debug("ENVAPIs is loaded!");
          },
        });
        // Connect to Device API
        ModelAPIProfiles.get(ModelAPIProfiles.deviceId, {
          redoOnReconnect: false,
          success: function (deviceAPIModelAPI) {
            devAPI = deviceAPIModelAPI;
            dev.resolve();
            console.debug("DEVAPIs is loaded!");
          },
        });
        // Connect to Storage API
        ModelAPIProfiles.get(ModelAPIProfiles.storageId, {
          redoOnReconnect: false,
          success: function (storageAPIModelAPI) {
            storageAPI = storageAPIModelAPI;
            str.resolve();
            console.debug("Storage APIs is loaded!");
          },
        });
        // Connect to Storage API
        ModelAPIProfiles.get(ModelAPIProfiles.heatingId, {
          redoOnReconnect: false,
          success: function (heatingAPIModelAPI) {
            console.debug("heating", heatingAPIModelAPI);
            heatingAPI = heatingAPIModelAPI;
            heating.resolve();
            //console.debug("Storage APIs is loaded!");
          },
        });
      });
      // Function to be called after all APIs are accessible
      $.when.apply($, [env, dev, str]).done(function() {
        gui();
        console.debug("All APIs are loaded!");
      });
    },
  };
})();
