'use strict';
/**
  Author: Cem Akpolat
  Request Parameters allows us to define a simple Request for Model API.
 **/

// These time definitions are taken from IOLITE Timeseries interface
var times={
  SECOND:"SECOND",
  MINUTE:"MINUTE",
  QUARTER_HOUR:"QUARTER_HOUR",
  HALF_HOUR:"HALF_HOUR",
  HOUR:"HOUR",
  HALF_DAY:"HALF_DAY",
  DAY:"DAY",
  WEEK:"WEEK",
  MONTH:"MONTH",
  YEAR:"YEAR"
};

var requestParams={
  apis:{
        environment:0,
        device:1,
        heating:2,
        storage:3
    },
    locations:{
      methods:{
        getLocations:"getLocations"
      }
    },
    devices:{
        methods:{
          getAllDevices:"getAllDevices",// requires property name and location {prop:"on", location:"kitchen"}
          getGivenDevice:"getGivenDevice",
          getDevicePerLocation:"getDevicePerLocation",
        },
        deviceNames:{}
    },
    properties:{
        methods:{
          getAllProperties:"getAllProperties",
          getSamePropOfAllDevices:"getSamePropOfAllDevices",
          getPropOfGivenDevice:"getPropOfGivenDevice",
          getPropHistoryOfGivenDevice:"getPropHistoryOfGivenDevice",
          updatePropertyValue:"updatePropertyValue"
        },
        propertyNames:{
          on:"http://iolite.de#on",
          off:"http://iolite.de#off",
          powerUsage:"http://iolite.de#powerUsage"
        },
        value:null
    },
    history:{
      methods:{
        getAllHistoriesOfAllDevices:"getAllHistoriesOfAllDevices",
        getPropHistoriesOfGivenDevices:"getHistoryOfGivenDevices",
        getHistroyOfGivenPropDevices:"getHistroyOfGivenPropDevices"
      }
    },
    timeInterval:times,
    resolution:times,
    functionNames:{
      AVERAGE:"AVERAGE",
      COUNT:"COUNT",
      SUM:"SUM"
    },
    // Please check the required parameters for each action name in IOLITE Device API
    actionNamesForDeviceAPI:{
      //INFO:Please check package de.iolite.app.api.device -> DevicePropery class
      getValuesSince:"getValuesSince",                         // long -> time value
      getValuesOf:"getValuesOf",                               // long, TimeInterval -> time value, time interval
      getValuesBetween:"getValuesBetween",                     // long, long -> time value
      getAggregatedValuesSince:"getAggregatedValuesSince",     // long, TimeInterval, Function name
      getAggregatedValuesBetween:"getAggregatedValuesBetween", // long time, long time,TimeInterval, Function name
      getAggregatedValuesOf:"getAggregatedValuesOf",            // long, TimeInterval,TimeInterval, Function name
      requestValueUpdate:"requestValueUpdate"                  // update the value of given property

    },
    actionNamesForStorateAPI:{
      //INFO:Please check package de.iolite.app.api.storage.impl -> StorageAPIimpl class
      saveInt:"saveInt",                // key, int
      saveBoolean:"saveBoolean",        // key, boolean
      loadBoolean:"loadBoolean",        // boolean
      saveDouble:"saveDouble",          // key, double
      saveString:"saveString",          // key, string
      saveIntList:"saveIntList",        // key, list
      getIntListKeys:"getIntListKeys",
      getDoubleListKeys:"getDoubleListKeys"
      //....
    }
};
