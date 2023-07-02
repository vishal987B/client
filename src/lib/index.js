// translate to javascript and custom it by Blueberry 03/02/2023
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
} from "@mui/x-data-grid";

import DefaultToolbar from "./components/DefaultToolbar";
import {useEffect} from "react";

function FullFeaturedCrudGrid({columns, rows, defaultPageSize, onSaveRow, onDeleteRow, createRowData, onProcessRowUpdateError, ...props}) {
    // debugger;
    const [internalRows, setInternalRows] = React.useState(rows);
    const [rowModesModel, setRowModesModel] = React.useState(
        {}
    );

    useEffect(()=>{
        setInternalRows(rows);
    }, [rows]);

    const handleRowEditStart = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setInternalRows(internalRows.filter((row) => row._id !== id));
        onDeleteRow(id, internalRows.find((row) => row._id === id), internalRows);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });

        const editedRow = internalRows.find((row) => row._id === id);
        if (editedRow?.isNew) {
            setInternalRows(internalRows.filter((row) => row._id !== id));
        }
    };

    const handleNewRow = () => {
        console.log("---sdfsdf----")
        // let newID = createRowData()
        setInternalRows((oldRows) => [...oldRows, {
        no:createRowData(oldRows).no,
        _id:'',
        empId: "",
        name: "",
        status: "",
        joiningDate: "",
        dob: "",
        skills: "",
        salary: "",
        address: "", isNew: true }]);
    }
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow};
        if(!updatedRow.isNew) updatedRow.isNew = false;
        const oldRow = internalRows.find((r)=>r._id === updatedRow._id); 
        // setInternalRows(internalRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        onSaveRow(updatedRow.id, updatedRow, oldRow, internalRows);
        return updatedRow;
    };

    const appendedColumns = [
            ...columns,
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                console.log("----id---",id)
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    const [pageSize, setPageSize] = React.useState(defaultPageSize || 10);
    return (
        <div>
            <DataGrid
                checkboxSelection
                rows={internalRows}
                columns={appendedColumns}
                editMode="row"
                getRowId={(row) =>  row._id }
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={onProcessRowUpdateError}
                slots={{
                    toolbar: DefaultToolbar
                }}
                slotProps={{
                    toolbar: { rows: internalRows, setRows: setInternalRows, setRowModesModel, handleNewRow, columns }
                }}
                experimentalFeatures={{ newEditingApi: false }}

                //pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                {...props}
            />
        </div>

    );
}



export default FullFeaturedCrudGrid;
