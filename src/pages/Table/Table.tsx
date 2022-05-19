import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./table.scss";

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
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
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
  const [pageNum, setPageNum] = useState<number>(1);
  const [dataPerPage] = useState<number>(5);
  const [filteredData, setFilteredData] = useState<TableData[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://${process.env.REACT_APP_SECRET}.mockapi.io/table`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  useEffect(() => {
    handleFilteredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, dataPerPage, data]);

  const handleFilteredData = () => {
    const firstIndex = pageNum * dataPerPage - dataPerPage;
    const lastIndex = pageNum * dataPerPage;
    setFilteredData([...data.slice(firstIndex, lastIndex)]);
  };

  const handlePrevPage = () => {
    setPageNum(pageNum - 1);
  };
  const handleNextPage = () => {
    setPageNum(pageNum + 1);
  };
  const handlePageChange = (index: number) => {
    setPageNum(index + 1);
  };

  return (
    <div className="table">
      <h1 className="table-title">Employees</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns?.map((col, index) => (
                <th key={index}>{col?.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((data) => (
              <tr key={data?.id}>
                <td>{data?.id}</td>
                <td>{data?.name}</td>
                <td>{data?.email}</td>
                <td>{data?.position}</td>
                <td>{data?.phone}</td>
                <td>{data?.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-pagination">
          <button
            className="table-pagination-button table-pagination-left"
            disabled={pageNum === 1}
            onClick={handlePrevPage}
          >
            ◂
          </button>
          {Array(data.length / dataPerPage)
            .fill("")
            .map((_, index) => (
              <button
                key={index}
                className={`table-pagination-button ${
                  pageNum === index + 1 && "active-page"
                }`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="table-pagination-button table-pagination-right"
            disabled={pageNum * dataPerPage === data.length}
            onClick={handleNextPage}
          >
            ▸
          </button>
        </div>
      </div>
      <button className="go-to-btn" onClick={() => navigate("/")}>
        Go to Counter
      </button>
    </div>
  );
};

export default Tables;
