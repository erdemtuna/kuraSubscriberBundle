/**
  Author: Cem Akpolat
  Own API Connector enables communicating with own defined API locating in IOLITE.
 **/
var ownAPIConnector=(function(){
  return{
    // DB Connection
    getDBConn:function(callback){ // Database request
      $.ajax({
         type:'GET',
         url : 'DBRequestHandler', // Request Handler Name
         data : "SID="+Client.SID,// Session ID must be given at every request.
         success : function(responseText) {
           //console.debug("own API DB Connection:",responseText);
           callback(responseText); // This callback function can be view classs
          },
        error:function(error){
          console.debug("Error:",error);
        }
      });
    },
    // JSON Request
    getJSONRequest:function(callback){ // JSON Request
      $.ajax({
         type:'GET',
         url : 'JSONRequestHandler',// Request Handler Name
         data : "SID="+Client.SID, // second parameter can be added as "&param=value"
         success : function(responseText) {
           //console.debug("own API a simple JSON Requests:",responseText);
           callback(responseText);
          },
        error:function(error){
          console.debug("Error:",error);
        }
      });
    },
    // HTML Request
     getHTMLRequest:function(callback){ // JSON Request
      $.ajax({
         type:'GET',
         url : 'HTMLRequestHandler',
         data : "SID="+Client.SID, // second parameter can be added as "&param=value"
         success : function(responseText) {
           //console.debug("own API a simple HTML Requests:",responseText);
           callback(responseText);
          },
        error:function(error){
          console.debug("Error:",error);
        }
      });
    }
     /*getXMLRequest:function(callback){ // JSON Request
      $.ajax({
         type:'GET',
         url : 'XMLRequestHandler',
         data : "SID="+Client.SID, // second parameter can be added as "&param=value"
         success : function(responseText) {
           console.debug("own API a simple XML Requests:",responseText);
           //callback(responseText);
          },
        error:function(error){
          console.debug("Error:",error);
        }
      });
    }*/
  };
})();
