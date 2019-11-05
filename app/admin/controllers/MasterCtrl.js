"use strict";

angular.module('app.admin').controller('CollapseDemoCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

angular.module('app.admin').controller('MasterCtrl', function ($scope, $cookieStore, $state, $localStorage, $auth) {

    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.user = $localStorage.user;
    $scope.menu = JSON.parse($scope.user.menu);

    $scope.logout = function(){
        if (!$auth.isAuthenticated()) {
          return;
        }
        $auth.logout().then(function() {
            console.log("logout");
        		$localStorage.$reset();
            $state.go('auth.login');
       });
    }

});
