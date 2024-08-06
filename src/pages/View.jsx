import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${id}`)
      .then((resp) => setEmployee({ ...resp.data[0] }));
  }, [id]);

  return (
    <div>
      <div>
        <h1>Personal Details</h1>
      </div>

      <div>
        <strong>First Name:- </strong>
        <span>{employee.firstName}</span>
        <br />
        <br />

        <strong>Last Name:- </strong>
        <span>{employee.lastName}</span>
        <br />
        <br />

        <strong>Salary:- </strong>
        <span>{employee.salary}</span>
        <br />
        <br />

        <strong>City:- </strong>
        <span>{employee.city}</span>
        <br />
        <br />

        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
