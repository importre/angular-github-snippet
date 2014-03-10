var app = angular.module("app", ["ghsnip"]);

app.controller("appCtrl", ["$scope",
  function ($scope) {
    $scope.code = "https://github.com/importre/angular-github-snippet/blob/381d519c8baadf5273f24d50e7182c85fafbc970/index.html";
    $scope.app = "https://github.com/importre/angular-github-snippet/blob/381d519c8baadf5273f24d50e7182c85fafbc970/javascripts/app.js";
  }
]);
