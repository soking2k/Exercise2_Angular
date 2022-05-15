import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [sideBar]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  title = 'Exercise2';

  columnDefs = [
    {headerName: "Make", field: "make"},
    {headerName: "Model", field: "model"},
    {headerName: "Price", field: "price"},

  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    sortable: true,
    filter: true,
  };
  rowData =[
    {make: "ToYoTa", model:"celica", price: 35000},
    {make: "ToYoTa1", model:"celica1", price: 35000},
    {make: "ToYoTa2", model:"celica2", price: 35000}

  ]
}
