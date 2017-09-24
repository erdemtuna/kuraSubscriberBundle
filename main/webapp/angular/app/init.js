var templateUrls = [
  'angular/app/views/autocomplete.html',
  'angular/app/views/bottomSheet.html',
  'angular/app/views/button.html',
  'angular/app/views/card.html',
  'angular/app/views/datePicker.html',
  'angular/app/views/gridList.html',
  'angular/app/views/home.html',
  'angular/app/views/input.html',
  'angular/app/views/progressCircular.html',
  'angular/app/views/progressLinear.html',
  'angular/app/views/toast.html',
  'angular/app/views/whiteframe.html',
  'angular/app/views/dialog.html',
  'angular/app/views/dialog1.tmpl.html',
  'angular/app/views/tabDialog.tmpl.html'

];
var templates = {};
// var envAPI;
// var devAPI;

// Tries to load each an array of template URLs defined in t.
// Depending on whether or not the AJAX request was successful,
// callback will be called if all templates were laoded successfully.
var loadTemplates = function(t, callback) {

  var templates = {};
  var promises = [];

  t.forEach(function(url, i) {
    promises.push($.Deferred());
    templates[url] = null;
  });

  t.forEach(function(url, i) {
    console.log('Requesting', url);
    $.ajax({
      crossOrigin: true,
      url: url
    }).done(function(data) {
      console.log(url, 'successfully loaded');

      templates[url] = data;
      promises[i].resolve();
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error(url, 'failed to load:', textStatus);
      templates[url] = url + ' failed to load: ' + textStatus;
      promises[i].reject();
    });
  });

  // Function to be called when all templates successfully loaded
  $.when.apply($, promises).then(function() {
    console.log('All templates requested');
    callback(templates);
  });

};

$(document).ready(function() {
  console.log('Document is ready');
  loadTemplates(templateUrls, function(results){
    console.log('loadTemplates callback');
    // Templates loaded
    templates = results;
    console.debug('Continue initialization of Angular');
    window.setTimeout(angular.resumeBootstrap, 0);
  });
  angular.module('init', []).run(['$templateCache', function($templateCache) {
    for (var tname in templates) {
      // console.debug(tname,templates[tname]);
      console.log('Adding', tname, 'to template chache');
     $templateCache.put(tname, templates[tname]);
    }
  }]);
});
