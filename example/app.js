var app = angular.module("app", ["ghsnip"]);

app.controller("appCtrl", ["$scope",
  function ($scope) {
    $scope.title = "angular-github-snippet example";
    $scope.subTitle1 = "All Lines";
    $scope.subTitle2 = "5~11, 18, 19, 20, 24~27";
    $scope.examSrc = "https://github.com/importre/chromeadb/blob/master/src/scripts/chromeadb.js";
    $scope.lines = "5:11,18,19,20,24:27";
  }
]);
