'use strict';

describe('ghsnip', function () {
  var scope, ctrl;

  beforeEach(module('ghsnip'));

  beforeEach(inject(function ($controller) {
    scope = {};
    ctrl = $controller('ghsnipCtrl', {$scope: scope});
  }));

  it("should not be able to parse lines", function () {
    expect([]).toEqual(scope.parseLines(""));
    expect([]).toEqual(scope.parseLines(null));
    expect([]).toEqual(scope.parseLines(undefined));
    expect([]).toEqual(scope.parseLines("string"));
    expect([]).toEqual(scope.parseLines("0"));
    expect([]).toEqual(scope.parseLines(1));
    expect([]).toEqual(scope.parseLines([]));
  });

  it("should parse lines", function () {
    expect([1]).toEqual(scope.parseLines("1"));
    expect([1, 2]).toEqual(scope.parseLines("1,2"));
    expect([1, 2]).toEqual(scope.parseLines("1,2,"));
    expect([1, 2]).toEqual(scope.parseLines("1,,,2,"));
    expect([1, 2]).toEqual(scope.parseLines("1,2,2,2"));
    expect([1, 2, 3]).toEqual(scope.parseLines("3,2,  1"));
    expect([1, 2, 3]).toEqual(scope.parseLines("1,1,a,2,3,b"));
  });

  it("should not be able to parse multi lines", function () {
    expect([]).toEqual(scope.parseLines("1:"));
    expect([]).toEqual(scope.parseLines("0:1"));
    expect([]).toEqual(scope.parseLines("-1:1"));
    expect([]).toEqual(scope.parseLines(":1"));
    expect([]).toEqual(scope.parseLines(":1:"));
  });

  it("should parse multi lines", function () {
    expect([1]).toEqual(scope.parseLines("1:1"));
    expect([1, 2, 3]).toEqual(scope.parseLines("1:3"));
    expect([1, 2, 3]).toEqual(scope.parseLines("3:1"));
    expect([1, 2, 3]).toEqual(scope.parseLines("1:2,2:3"));
    expect([1, 2, 3, 10, 11]).toEqual(scope.parseLines("1,3,2,10:11"));
  });
});