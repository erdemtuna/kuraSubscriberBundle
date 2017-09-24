/**
  Author: Cem Akpolat
  Views allows to view the data on the user side. Received and processed Data can be associated with HTML Elements.
  Each view function can be assigned to another element on the interface.
 **/
var views=(function(){
  return{

      view1:function(data){
          console.log("Message from view1", data);
          //console.warn(data);
      },
      view2:function(data){},
      viewDBConn:function(data){
        $("#dbresults").empty();
        var res = data.split(";");
        var html='<div class="container">'+
                  '<h2>Mysql database examples for IOLITE Student projects</h2>'+
                  '<p>This example covers creating DB, inserting/selecting/updating/deleting/... records.'+
                  'You have to modify my code in a way that your code should prevent the creation of DB while opening IOLITE App.</p>'+
                  '<p>Note that bootstrap is being used as css framework with online url address, downloading them under the resource folder can be better  </p>'+
                  '<p>Another important point, for the sake of simplicity you can use my project as a basis project and please install m2e extension for eclipse </p>'+
                  '<a>http://www.eclipse.org/m2e/</a>'+
                  '<table class="table table-striped">'+
                  '<thead>'+
                  '<tr><th>ID</th><th>Age</th><th>Firstname</th><th>LastName</th></tr>'+
                  '</thead><tbody>';

        var rows="";
        for(var i=0;i<res.length-1;i++){
          var row=res[i].split(',');
          rows+="<tr>";
          for(var j=0;j<row.length;j++){
            rows+="<td>"+row[j].split(":")[1]+"</td>";
          }
          rows+="</tr>";
        }

        html+=rows+'</tbody></table></div>';
        $("#dbresults").append(html);
      },
      // update the regularly view
      updateView:function(view){
          setInterval(function(){
              view();
          },5000);
      },
      // update the view with the given time interval.
      updateViewWithGivenTimeInterval:function(view,timeInterval){
          setInterval(function(){
              view();
          },timeInterval);
      }
  };
})();
