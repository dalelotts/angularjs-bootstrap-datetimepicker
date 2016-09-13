/** See the file "LICENSE" for the full license governing this code.
 *
 * @author Dale "Ducky" Lotts
 * @since 9/13/16.
 */

/*globals angular, moment, $ */
;(function () {
  'use strict'

  angular.module('demo', ['demo.dateRangeController', 'ui.bootstrap.datetimepicker'])

  angular
    .module('demo.dateRangeController', [])
    .controller('dateRangeController', demoController)



  demoController.$inject = ['$scope']

  function demoController ($scope) {

    $scope.controllerName = 'dateRangeController'

    /* Bindable functions
     -----------------------------------------------*/
    $scope.endDateBeforeRender = endDateBeforeRender
    $scope.endDateOnSetTime = endDateOnSetTime
    $scope.startDateBeforeRender = startDateBeforeRender
    $scope.startDateOnSetTime = startDateOnSetTime

    function startDateOnSetTime () {
      $scope.$broadcast('start-date-changed')
    }

    function endDateOnSetTime () {
      $scope.$broadcast('end-date-changed')
    }

    function startDateBeforeRender ($dates) {
      if ($scope.dateRangeEnd) {
        var activeDate = moment($scope.dateRangeEnd)

        $dates.filter(function (date) {
          return date.localDateValue() >= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false
        })
      }
    }

    function endDateBeforeRender ($view, $dates) {
      if ($scope.dateRangeStart) {
        var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute')

        $dates.filter(function (date) {
          return date.localDateValue() <= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false
        })
      }
    }
  }
}())
