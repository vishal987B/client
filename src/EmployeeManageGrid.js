import * as React from "react";
import FullEditDataGrid from "./lib/index";
import { useEffect, useState } from "react";
import employeeController from "./employee";

export default function EmployeeManageGrid() {
    const [rows, setRawRows] = useState([]);
    const [loading, setLoading] = useState(false);


    const setRows = (rows) => {
        return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
    };
    useEffect(() => {
        setLoading(true);
        employeeController
            .getAll()
            .then((res) => {
                setRows(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
        employeeController
            .saveRow(updatedRow)
    };

    const onDeleteRow = (id, oldRow, oldRows) => {
        employeeController
            .deleteRow(id)
    };

    const createRowData = (rows) => {
        const newNo = Math.max(...rows.map((r) => (r.no ? r.no : 0) * 1)) + 1;
        return {no: newNo };
    };

    return (
        <FullEditDataGrid
            columns={columns}
            rows={rows}
            getRowId={(row) =>  row._id}
            onSaveRow={onSaveRow}
            onDeleteRow={onDeleteRow}
            createRowData={createRowData}
            loading={loading}
        />
    );
}

const columns = [
    // {
    //     field: "no",
    //     headerName: "Sr No",
    //     width: 20,
    //     align: "left",
    //     type: "string",
    //     editable: false
    // },
    {
        field: "empId",
        headerName: "Employee ID",
        width: 80,
        align: "left",
        type: "string",
        editable: true
    },
    {
        field: "name",
        headerName: "Name",
        width: 100,
        headerAlign: "left",
        type: "string",
        align: "left",
        editable: true
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        headerAlign: "left",
        type: "string",
        align: "left",
        editable: true
    },
    {
        field: "joiningDate",
        headerName: "Joining Date",
        width: 250,
        headerAlign: "left",
        type: "string",
        editable: true
    },
    {
        field: "dob",
        headerName: "Date of Birth",
        width: 250,
        headerAlign: "left",
        type: "string",
        editable: true
    },
    {
        field: "skills",
        headerName: "Skills",
        width: 250,
        headerAlign: "left",
        type: "string",
        editable: true
    },
    {
        field: "salary",
        headerName: "Salary",
        width: 250,
        headerAlign: "left",
        type: "string",
        editable: true
    },
    {
        field: "address",
        headerName: "Address",
        width: 250,
        headerAlign: "left",
        type: "string",
        editable: true
    },

];
