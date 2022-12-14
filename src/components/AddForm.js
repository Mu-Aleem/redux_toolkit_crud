import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../redux/Slices/users/UsersThunkAction";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../redux/Slices/users/UserSlice";

const AddForm = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const UserStatus = useSelector((state) => state.user.status);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      id: nanoid(),
      ...formData,
    };
    const ResponseData = await dispatch(addData(body));
    if (ResponseData.payload.responseStatus) {
      navigate("/");
    }
    setFormData({
      name: "",
      email: "",
    });
  };
  return (
    <>
      <div className="productsfrom">
        <h1>form</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder=" Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
          <button
            type="submit"
            disabled={UserStatus === "loading" ? true : false}
          >
            {UserStatus === "loading" ? "Please Wait" : "submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddForm;
