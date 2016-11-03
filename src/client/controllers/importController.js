
/*jshint esversion: 6 */
angular
  .module('Dbview.ImportController', ['ui.router','ngSanitize', 'ngCsv'])
  .controller('ImportController', ['$scope', 'tableService', '$stateParams', 'dbService', '$http', '$state', '$timeout', importController]);

function importController($scope, tableService, $stateParams, dbService, $http, $state, $timeout) {
  $scope.name = '';
  $scope.visible = false;

  $("#filename").change(function(evt) {
    var file = evt.target.files[0];
    Papa.parse(file, {
       header: true,
       dynamicTyping: true,
       complete: function(results) {
         $scope.$apply(function(){
           $scope.headers = Object.keys(results.data[0]);
           $scope.body = results.data;
           $scope.visible = true;
         })
       }
    });

  });


  $scope.importTable = function() {

    let tempHeader = {};

    $scope.headers.forEach(function(header) {
      tempHeader[header] = typeof $scope.body[0][header] === 'number' ? 'Integer' : 'Varchar';
    });

    $scope.rowsToAdd = tempHeader;

    console.log('tempHeader', $scope.rowsToAdd);
    console.log('scopename', $scope.name);
    $http({
      method: 'POST',
      url: '/createTable',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { creds: dbService.creds, where: $scope.name, valuesToInsert: $scope.rowsToAdd, table: $scope.name }
    })
      .then((response) => {
        $scope.body.forEach(function(row) {
          $http({
            method: 'POST',
            url: '/insert',
            headers: {
            'Content-Type': 'application/json'
            },
            data: { creds: dbService.creds, where: undefined, valuesToInsert: row, table: $scope.name }
          })
        })
        tableService.addTableData($scope.name, response.data)
        alert('Table Created');
    }); 
  };
}

