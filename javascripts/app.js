var app = angular.module("app", ["ghsnip"]);

app.controller("appCtrl", ["$scope",
  function ($scope) {
    $scope.code = "https://github.com/importre/angular-github-snippet/blob/1352919f8baef25e2a771239fa21d281b91e8279/index.html";
    $scope.app = "https://github.com/importre/angular-github-snippet/blob/gh-pages/javascripts/app.js";
  }
]);
