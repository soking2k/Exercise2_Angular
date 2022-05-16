import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridApi, Color, GridReadyEvent, IColumnToolPanel, SideBarDef,ICellRenderer,ICellRendererParams} from 'ag-grid-community';
import 'ag-grid-enterprise';


class DeltaIndicator implements ICellRenderer {
  private eGui!: HTMLElement;
  init(params: ICellRendererParams) {
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    const imageElemennewt = document.createElement('p');
    var count=0;


    if (params.value === 'Invalid') {
      count=Math.floor(Math.random() * 3) + 1;
      imageElemennewt.innerHTML =
      'Invalid <span style="color:#fff0f5;"><span style="background-color:#d9524e;;padding:4px;">'+count+'</span></span>';
      this.eGui = imageElemennewt;
    }  else if (params.value === 'Published') {
      imageElement.src =
        'assets/img/tick.png';
        element.appendChild(document.createTextNode(params.value + " "));
        element.appendChild(imageElement);
        this.eGui = element;
    } else {
      imageElement.src =
        'assets/img/peding.png';
        element.appendChild(document.createTextNode(params.value + " "));
        element.appendChild(imageElement);
        this.eGui = element;
    }

  }
  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}
@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss'],

  template: `
    <ag-grid-angular
      style="width: 100%; height: 80%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [pagination]="true"
      [sideBar]="sideBar"
      [paginationPageSize]= 25
      [columnTypes]="columnTypes"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})

export class AgreementsComponent {
  private gridApi!: GridApi;


  public columnDefs: ColDef[] = [
    { field: 'Status' , maxWidth: 130, minWidth: 130,
    filter: 'agTextColumnFilter',
    cellRenderer: DeltaIndicator,

    cellStyle: params => {
      if (params.value === 'Invalid') {
        //mark police cells as red
        return { color: 'red', 'FontSize': '96px', 'font-weight': 'bold' };
      }
      else if (params.value === 'Published') {
        return { color: 'green', 'FontSize': '96px', 'font-weight': 'bold' };
      }
      else {
        return { color: '#aaaaaa', 'FontSize': '96px', 'font-weight': 'bold' };
      }
      return null;
    },
  },
  { field: 'Quote Number', maxWidth: 160
},

  {
    field: 'Agreement Name', maxWidth: 190,

    cellStyle: { color: 'rgb(15 183 188)', 'FontSize': '96px', 'font-size': '15px' }

  },
  { field: 'Agreement Type', maxWidth: 180 },
  { field: 'Distributor Name', maxWidth: 180 },
  { field: 'Effective Date', type: ['dateColumn', 'nonEditableColumn'], maxWidth: 160 },
  { field: 'Expiration Date', type: ['dateColumn', 'nonEditableColumn'], maxWidth: 160 },
  { field: 'Created Date', type: ['dateColumn', 'nonEditableColumn'], maxWidth: 160 },
  { field: 'Days Until Expiration', maxWidth: 190, minWidth: 160 },
  ];



  public sideBar: SideBarDef = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
        },
      },
    ],
    defaultToolPanel: 'columns',
  };
  public defaultColDef: ColDef = {
    // set the default column width
 //  flex:1,
    flex: 1,
    minWidth: 120,

    // make every column editable
    editable: true,


    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,
  };

  public columnTypes: {
    [key: string]: ColDef;
  } = {
    numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
    medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
    nonEditableColumn: { editable: false },
    dateColumn: {
      // specify we want to use the date filter
      filter: 'agDateColumnFilter',
      // add extra parameters for the date filter
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = cellValue.split('/');
          const day = Number(dateParts[0]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[2]);
          const cellDate = new Date(year, month, day);
          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
  };

  constructor(private http: HttpClient) {}

  /**
   * Updates the Days of Air Frost column - adjusts the value which in turn will demonstrate the Component refresh functionality
   * After a data update, cellRenderer Components.refresh method will be called to re-render the altered Cells
   */


  onGridReady(params: any) {
    this.gridApi = params.api;

    this.http
      .get('assets/data/data.json')
      .subscribe((data) => params.api.setRowData(data));
  }
}
