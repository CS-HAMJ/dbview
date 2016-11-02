
class tableService {
  constructor() {
    this.activeTables = [];
    this.tableData = {};
    this.currentTable = '';
  }
  activateTable(tablename) {
    this.activeTables.push(tablename)
  }
  addTableData(table, data) {
    this.tableData[table] = data;
  }
  getData(table) {
    return this.tableData[table];
  }
}

angular.module('Dbview.tableService', []).service('tableService', [tableService]);
