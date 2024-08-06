import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialValue = {
  firstName: "",
  lastName: "",
  salary: "",
  city: "",
};
const AddEdit = () => {
  const [employee, setEmployee] = useState(initialValue);
  const { firstName, lastName, salary, city } = employee;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${id}`)
      .then((resp) => setEmployee({ ...resp.data[0] }));
  }, [id]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !salary || !city) {
      toast.error("Please Fill All Fields");
    } else {
      if (!id) {
        axios
          .post("http://localhost:3001/api/post", {
            firstName,
            lastName,
            salary,
            city,
          })
          .then(() => {
            setEmployee({
              firstName: "",
              lastName: "",
              salary: "",
              city: "",
            });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
        toast.success("Employee Added successfully.");
      } else {
        axios
          .put(`http://localhost:3001/api/update/${id}`, {
            firstName,
            lastName,
            salary,
            city,
          })
          .then(() => {
            setEmployee({
              firstName: "",
              lastName: "",
              salary: "",
              city: "",
            });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
        toast.success("Employee Updated successfully.");
      }
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div>
      <div>
        <h1>Add Emplyee Form</h1>
      </div>

      <div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName || ""}
            onChange={handleData}
            placeholder="Enter First Name"
            required
          />
          <br />
          <br />

          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName || ""}
            onChange={handleData}
            placeholder="Enter Last Name"
            required
          />
          <br />
          <br />

          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={salary || ""}
            onChange={handleData}
            placeholder="Enter Salary"
            required
          />
          <br />
          <br />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city || ""}
            onChange={handleData}
            placeholder="Enter City"
            required
          />
          <br />
          <br />

          <button>Save</button>

          <Link to='/'>
          <button>Go Back</button>
          </Link>
          
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
