var app = angular.module("app", ["ghsnip"]);

app.controller("appCtrl", ["$scope",
  function ($scope) {
    $scope.code = "https://github.com/importre/angular-github-snippet/blob/412449165a51805d242515ecc256a9c50a459911/index.html";
    $scope.app = "https://github.com/importre/angular-github-snippet/blob/381d519c8baadf5273f24d50e7182c85fafbc970/javascripts/app.js";
  }
]);
