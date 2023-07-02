
import axios from 'axios';

let rows = [];
const getAll = () => {
    return new Promise((resolve, reject) => {
    axios.get('http://localhost:8080/get-emp')
        .then(function (response) {
            rows = response.data.data;
            resolve({data:rows});
        })
        .catch(function (error) {
            console.log(error);
        })
    });
};

const saveRow = (row) => {
    if(row?._id !== ''){
        // already data available
        let data={
            "empId":row.empId,
            "name" : row.name,
            "status":row.status,
            "joiningDate":row.joiningDate,
            "dob": row.dob,
            "skills" : row.skills,
            "salary": row.salary,
            "address" :row.address
        }
        axios.patch(`http://localhost:8080/update/${row._id}`, data).then(res=>{
        window.location.reload(false);
        });
    }else{
        axios.post('http://localhost:8080/create-emp',{...row})
        .then(function (response) {
            window.location.reload(false);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
};

const deleteRow = (rowId) => {
        axios.delete(`http://localhost:8080/delete/${rowId}`).then((res)=>{
            window.location.reload(false);
        })
};

const EmployeeController = {
    getAll,
    saveRow,
    deleteRow
};

export default EmployeeController;
