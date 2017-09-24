
var app = angular.module('App', ['ui.router', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("home", {
        url: "/home",
        controller: "HomeCtrl",
        templateUrl: "angular/app/views/home.html"
    })
    $stateProvider.state("autocomplete", {
        url: "/autocomplete",
        controller: "AutocompleteCtrl",
        templateUrl: "angular/app/views/autocomplete.html"
    })
    $stateProvider.state("bottomSheet", {
        url: "/bottomSheet",
        controller: "BottomSheetCtrl",
        templateUrl: "angular/app/views/bottomSheet.html"
    })
    $stateProvider.state("button", {
        url: "/button",
        controller: "ButtonCtrl",
        templateUrl: "angular/app/views/button.html"
    })
    $stateProvider.state("dashboard", {
        url: "/",
        controller: "CardCtrl",
        templateUrl: "angular/app/views/card.html"
    })
    $stateProvider.state("datePicker", {
        url: "/datePicker",
        controller: "DatePickerCtrl",
        templateUrl: "angular/app/views/datePicker.html"
    })
    $stateProvider.state("gridList", {
        url: "/gridList",
        controller: "GridListCtrl",
        templateUrl: "angular/app/views/gridList.html"
    })
    $stateProvider.state("input", {
        url: "/input",
        controller: "InputCtrl",
        templateUrl: "angular/app/views/input.html"
    })
    $stateProvider.state("progressCircular", {
        url: "/progressCircular",
        controller: "ProgressCircularCtrl",
        templateUrl: "angular/app/views/progressCircular.html"
    })
    $stateProvider.state("progressLinear", {
        url: "/progressLinear",
        controller: "ProgressLinearCtrl",
        templateUrl: "angular/app/views/progressLinear.html"
    })
    $stateProvider.state("toast", {
        url: "/toast",
        controller: "ToastCtrl",
        templateUrl: "angular/app/views/toast.html"
    })
    $stateProvider.state("whiteframe", {
        url: "/whiteframe",
        templateUrl: "angular/app/views/whiteframe.html"
    })
    $stateProvider.state("dialog", {
        url: "/dialog",
        controller: "DialogCtrl",
        templateUrl: "angular/app/views/dialog.html"
    })
    $stateProvider.state("dialogTmpl1", {
        url: "/dialogtmpl1",
        templateUrl: "angular/app/views/dialog1.tmpl.html"
    })
    $stateProvider.state("tabDialog", {
        url: "/tabDialog",
        templateUrl: "angular/app/views/tabDialog.tmpl.html"
    })
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
          'default': '400', // by default use shade 400 from the blue palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      .accentPalette('amber')
      .warnPalette('red')
    .backgroundPalette('grey');
});

app.config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('social', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
});
