import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import "./table.scss";
import { useNavigate } from "react-router-dom";

interface TableData {
  name: string;
  email: string;
  phone: number;
  country: string;
  position: string;
  id: number;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
];

const Tables = () => {
  const [data, setData] = useState<TableData[] | []>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://${process.env.REACT_APP_SECRET}.mockapi.io/table`)
      .then((response) => {
        setData(response.data);
      });
  }, []);
  return (
    <div className="table-container">
      <h1 className="table-title">Employees</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5, showQuickJumper: false }}
      />
      <Button className="go-to-btn" onClick={() => navigate("/")}>
        Go to Counter
      </Button>
    </div>
  );
};

export default Tables;
