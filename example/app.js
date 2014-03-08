var app = angular.module("app", ["ghsnip"]);

app.controller("appCtrl", ["$scope",
  function ($scope) {
    $scope.title = "angular-github-snippet example";
    $scope.subTitle1 = "All Lines";
    $scope.subTitle2 = "5~11, 18, 19, 20, 24~27";
    $scope.examSrc = "https://api.github.com/repos/importre/chromeadb/contents/src/scripts/chromeadb.js?ref=655acdf29086f6b3e933b17404597674eaf9f9a0";
    $scope.lines = "5:11,18,19,20,24:27";
  }
]);
