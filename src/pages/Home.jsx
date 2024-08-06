import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("ASC");

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
    setData(response.data);
  };

  const searchEmployees = async (searchTerm) => {
    const response = await axios.get(
      `http://localhost:3001/api/search?firstName=${searchTerm}&lastName=${searchTerm}`
    );
    setData(response.data);
  };

  const sortEmployees = async (field, order) => {
    const response = await axios.get(`http://localhost:3001/api/sort`, {
      params: {
        sortField: field,
        sortOrder: order,
      },
    });
    setData(response.data);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Do You Really Want to Remove This Employee?")) {
      axios.delete(`http://localhost:3001/api/remove/${id}`);
      toast.success("Employee Deleted successfully.");
    }
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchEmployees(searchTerm);
    } else {
      fetchData();
    }
  }, [searchTerm]);

  useEffect(() => {
    sortEmployees(sortField, sortOrder);
  }, [sortField, sortOrder]);

  return (
    <div>
      <div>
        <h1>Employee List</h1>
      </div>
      <div>
        <Link to="/addEdit">
          <button>Add Employee</button>
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by First or Last Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
        >
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="salary">Salary</option>
        </select>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Salary</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.salary}</td>
                  <td>{item.city}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button>Edit</button>
                    </Link>

                    <button onClick={() => deleteEmployee(item.id)}>
                      Delete
                    </button>

                    <Link to={`/view/${item.id}`}>
                      <button>View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
