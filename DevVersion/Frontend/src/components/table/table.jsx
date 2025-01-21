import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColumnApiModule,
  ColumnAutoSizeModule,
  ModuleRegistry,
  ValidationModule,
  createGrid,
} from "ag-grid-community";
ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ColumnApiModule,
  ClientSideRowModelModule,
  ValidationModule /* Development Only */,
]);
import { useSelector } from "react-redux";

const GridExample = (data) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  // const [rowData, setRowData] = useState();
  const rowData = useSelector((select) => select.persons.persons);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Фамилия", field: "surname", minWidth: 150 },
    { headerName: "Имя", field: "name", minWidth: 150 },
    { headerName: "Отчество", field: "patronomyc", minWidth: 150 },
    { headerName: "Идентиф", field: "identif", minWidth: 150 },
  ]);

  // const onGridReady = useCallback((params) => {
  //   fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //     .then((resp) => resp.json())
  //     .then((data) => console.log(data));
  //   setRowData(data);
  // }, []);

  const onGridSizeChanged = useCallback(
    (params) => {
      // get the current grids width
      const gridWidth = document.querySelector(".ag-body-viewport").clientWidth;
      // keep track of which columns to hide/show
      const columnsToShow = [];
      const columnsToHide = [];
      // iterate over all columns (visible or not) and work out
      // now many columns can fit (based on their minWidth)
      let totalColsWidth = 0;
      const allColumns = params.api.getColumns();
      if (allColumns && allColumns.length > 0) {
        for (let i = 0; i < allColumns.length; i++) {
          const column = allColumns[i];
          totalColsWidth += column.getMinWidth();
          if (totalColsWidth > gridWidth) {
            columnsToHide.push(column.getColId());
          } else {
            columnsToShow.push(column.getColId());
          }
        }
      }
      // show/hide columns based on current grid width
      params.api.setColumnsVisible(columnsToShow, true);
      params.api.setColumnsVisible(columnsToHide, false);
      // wait until columns stopped moving and fill out
      // any available space to ensure there are no gaps
      window.setTimeout(() => {
        params.api.sizeColumnsToFit();
      }, 10);
    },
    [window]
  );

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div style={containerStyle}>
      <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
        <div style={gridStyle}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            // onGridReady={onGridReady}
            onGridSizeChanged={onGridSizeChanged}
            onFirstDataRendered={onFirstDataRendered}
          />
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <GridExample />
  </StrictMode>
);

export default GridExample;
