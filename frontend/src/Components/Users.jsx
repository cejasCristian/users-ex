import React, { useState } from "react";
import MaterialTable from "material-table";

import axiosClient from "../config/axios";

import Navbar from "./Navbar";

const Users = ({ user }) => {
  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    {
      title: "Last name",
      field: "lastName",
    },
    { title: "Age", field: "age", type: "numeric" },
  ]);

  const [data, setData] = useState(user);

  return (
    <>
      <Navbar />
      <MaterialTable
        title="Users Info"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                axiosClient.post("/users", newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                axiosClient.put(`/users/${data[index]._id}`, newData);
                console.log(newData);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                axiosClient.delete(`/users/${data[index]._id}`);
                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
};

export default Users;
