import * as React from "react";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import GridExcelExportMenuItem from "./GridExcelExportMenuItem";
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

function DefaultToolbar(props) {

    const {columns, handleNewRow } = props;

    const handleClick = () => {
        handleNewRow();
    };
    const onRefreshHandle = () =>{
        window.location.reload(false);

    }

    return (

        <GridToolbarContainer
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , padding:'20px'}}
        >
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExportContainer>
                <GridExcelExportMenuItem columns={columns} />
                <GridCsvExportMenuItem />
            </GridToolbarExportContainer>
            <Button onClick={handleClick} variant="outlined" startIcon={<AddIcon />}>
                    Add Employee
            </Button>
            <Button onClick={onRefreshHandle} variant="outlined" startIcon={<RefreshIcon />}>
                    Refresh
            </Button>
        </GridToolbarContainer>
    );
}

DefaultToolbar.defaultProps = {
    createRowData: (rows) => {
        const newId = Math.max(...rows.map((r)=>r._id * 1)) + 1;
        return {id: newId}
    }
}

export default DefaultToolbar;