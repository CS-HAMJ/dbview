angular
  .module('Dbview.DbController', ['ui.router'])
  .controller('DbController', ['$scope', '$http', '$location', 'dbService', 'tableService', '$state', '$timeout', dbController])

function dbController($scope, $http, $location, dbService, tableService, $state, $timeout) {
  $scope.tablenames = dbService.tables;
  $scope.tableData = {};
  $scope.onlineTables = tableService.activeTables

  // make post request to download a specific table
  $scope.requestTable = function (table) {
    console.log(table);
    $http({
      method: 'POST',
      url: '/requestTable',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { creds: dbService.creds, table }
    })
      .then((response) => {

        // add this table to the nav bar
        $scope.activateTable($scope, table, tableService);

        // save the data in table service
        tableService.addTableData(table, response.data);
      })
      .then((response) => {
        $scope.viewTable(table);
        $state.go('^.table');
      })
  }
  // view a specific table (actual tablename is passed via $stateParams)
  $scope.viewTable = function (table) {
    console.log("this is logging", table)
    tableService.currentTable = table;
  }
  // add table to nav bar if not already there
  $scope.activateTable = function($scope, table, tableService) {
    if (!$scope.onlineTables.includes(table)) {
      tableService.activateTable(table);
      $scope.onlineTables = tableService.activeTables
    }
  }

}







