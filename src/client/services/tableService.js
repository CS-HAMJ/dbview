
class tableService {
  constructor() {
    this.activeTables = [];
    this.tableData = {}
  }
  activateTable(tablename) {
    this.activeTables.push(tablename)
  }
  addTableData(table, data) {
    this.tableData[table] = data;
  }
  getData(table) {
    console.log(this.tableData);
    return this.tableData[table];
  }
}

angular.module('Dbview.tableService', []).service('tableService', [tableService]);