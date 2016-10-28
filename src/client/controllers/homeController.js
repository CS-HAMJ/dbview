angular
  .module('Dbview.HomeController', ['ngRoute'])
  .controller('HomeController', ['$scope', '$http', '$location', 'dbService', HomeController])

function HomeController($scope, $http, $location, dbService) {
  $scope.creds = {
    host: 'ec2-54-243-212-72.compute-1.amazonaws.com',
    database: 'd7ctrh5hg6aadj',
    user: 'dxrwecviorvrto',
    password: 'BDyJHAElIeyxjSLNxI1NBYu3Z4',
    port: '5432'
  };
  $scope.dialects = ['postgres', 'mysql'],

    $scope.post = function () {
      $http({
        method: 'POST',
        url: '/requestDB',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.creds
      })
        .then((response) => {
          console.log(response.data);
          dbService.setTables(response.data);
          $location.path('/db');
        });
      console.log('sending request with', $scope.creds);
    }
}


