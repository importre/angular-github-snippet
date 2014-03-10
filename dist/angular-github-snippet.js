// Copyright (c) 2014, Jaewe Heo. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

'use strict';

var ghsnip = angular.module("ghsnip", ["hljs", "base64"]);

ghsnip.directive("ghsnip", ["$http", "$base64", "$compile",
  function ($http, $base64, $compile) {

    function getNewContents(lines, contents) {
      var newContents = [];
      var num = 0;
      var prevNum = -1;
      var currNum;
      for (var i = 0; i < lines.length && i < contents.length; i++) {
        currNum = lines[i];
        if (prevNum >= 0 && currNum - prevNum != 1) {
          newContents[num++] = " \n\t...omitted...\n";
        }
        newContents[num++] = contents[currNum - 1];
        prevNum = currNum;
      }
      return newContents;
    }

    function makeHtml(data, newContents) {
      var html = "<div class='code'>" +
        "<h3><a href='" + data.html_url + "' target='_blank'>" +
        data.path +
        "</a></h3>" +
        "<hr/>" +
        "<div hljs>" + newContents.join(" \n") + "</div>" +
        "</div>"
      return html;
    }

    function getCodeHtml(data, lines) {
      var code = data.content;
      var i;
      var contents = code.split("\n");
      for (i = 0; i < contents.length; i++) {
        contents[i] = $base64.decode(contents[i]);
      }
      contents = contents.join("").split("\n");

      if (lines.length === 0) {
        for (i = 0; i < contents.length; i++) {
          lines[i] = i + 1;
        }
      }

      var newContents = getNewContents(lines, contents);
      var html = makeHtml(data, newContents);
      return html;
    }

    /**
     * loads github code snippet
     *
     * @param element
     * @param attr
     */
    function loadSnippet(scope, element, attr) {
      if (!attr.hasOwnProperty("code")) {
        return;
      }

      var html = "<div>loading...</div>";
      element.html(html);

      $http({method: "GET", url: attr.code}).
        success(function (data, status, headers, config) {
          var lines = null;
          if (attr.hasOwnProperty("lines")) {
            lines = attr.lines;
          }
          lines = scope.parseLines(lines);
          var html = getCodeHtml(data, lines);
          var newElement = $compile(html)(scope);
          element.replaceWith(newElement);
        }).
        error(function (data, status, headers, config) {
          element.html(data.message);
        });
    };

    return {
      restrict: "E",
      controller: "ghsnipCtrl",
      template: "<div ng-bind-html=\"code\"></div>",
      compile: function compile(tElement, tAttrs, transclude) {
        return function postLink(scope, iElement, iAttrs) {
          loadSnippet(scope, iElement, iAttrs);
        };
      }
    };
  }]
);

ghsnip.controller("ghsnipCtrl", ["$scope",
  function ($scope) {

    $scope.parseLines = function (lines) {
      var idx = 0;
      var data = [];
      var i, j, beg, end, line;
      var addLineNumber = function (num) {
        if (data.indexOf(num) < 0) {
          data[idx++] = num;
        }
      };

      if (!lines || typeof lines != "string") {
        return data;
      }

      lines = lines.split(",");
      for (i = 0; i < lines.length; i++) {
        line = lines[i];
        if (line.indexOf(":") > 0) {
          line = line.split(":");
          if (line.length == 2) {
            beg = parseInt(line[0]);
            end = parseInt(line[1]);
            if ((beg && end) && (beg > 0 && end > 0)) {
              if (beg > end) {
                end = [beg, beg = end][0]; // swap
              }
              for (j = beg; j <= end; j++) {
                addLineNumber(j);
              }
            }
          }
        } else {
          line = parseInt(line);
          if (line) {
            addLineNumber(line);
          }
        }
      }

      data.sort(function (a, b) {
        return a - b;
      });

      return data;
    };
  }]
);
