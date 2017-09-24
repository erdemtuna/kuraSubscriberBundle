'use strict';
app.controller('ToastCtrl', function ($scope, $mdToast, $document) {
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    $scope.toastPosition = angular.extend({}, last);

    $scope.getToastPosition = function () {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
          .filter(function (pos) { return $scope.toastPosition[pos]; })
          .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    $scope.showCustomToast = function () {
        $mdToast.show({
            controller: 'ToastCtrl',
            templateUrl: 'toast-template.html',
            parent: $document[0].querySelector('#toastBounds'),
            hideDelay: 6000,
            position: $scope.getToastPosition()
        });
    };

    $scope.showSimpleToast = function () {
        $mdToast.show(
          $mdToast.simple('Simple Toast!')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    };

    $scope.showActionToast = function () {
        var toast = $mdToast.simple('Action Toast!')
              .action('OK')
              .highlightAction(false)
              .position($scope.getToastPosition());

        $mdToast.show(toast).then(function (response) {
            if (response == 'ok') {
                alert('You clicked \'OK\'.');
            }
        });
    };

    $scope.closeToast = function () {
        $mdToast.hide();
    };
});


app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.put(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': 'img/png'}
        })
        .success(function(){
          console.debug("success");
        })
        .error(function(){
          console.debug("error");
        });
        $http({
          method: 'PUT',
          url: "http://127.0.0.1:5984/iolite/bmd",
          data: JSON.stringify({_id: '_security', admins: {names: ['"' + "cem" + '"'], roles: []}, readers: {names: [], roles: ['"myreaders"']}})
        }).success(function(){
          console.debug("success");
        })
        .error(function(){
          console.debug("error");
        });

        $http({
                    method: 'POST',
                    url: 'http://127.0.0.1:5984/iolite/file1',
                    headers: {'Content-Type': undefined},
                    data: {
                        File1: file
                    },
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }
                })
                .success(function (data) {
                  console.debug(data);
                })
                .error(function (data, status) {
                  console.debug(data,status);
                });
    }
}]);

app.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "http://127.0.0.1:5984/iolite/cemid";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

}]);
