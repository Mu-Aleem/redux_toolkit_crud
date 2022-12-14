import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUserByID } from "../redux/Slices/users/UsersThunkAction";
const Update = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const UpdateStatus = useSelector((state) => state.user.updateData);
  const UserStatus = useSelector((state) => state.user.status);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (UpdateStatus) {
      setFormData({
        name: UpdateStatus?.name,
        email: UpdateStatus?.email,
      });
    }
  }, [UpdateStatus]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (UpdateStatus) {
      const Updatebody = {
        id: UpdateStatus.id,
        ...formData,
      };
      const UpdateData = await dispatch(UpdateUserByID(Updatebody));
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
        <h1>Update form</h1>
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
            {UserStatus === "loading" ? "Please Wait" : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Update;
