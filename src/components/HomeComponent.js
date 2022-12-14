import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  CreateDeleteData,
} from "../redux/Slices/users/UsersThunkAction";
import { STATUS, SetTheUpdateData } from "../redux/Slices/users/UserSlice";

const HomeComponent = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const UserData = useSelector((state) => state.user.UserData);
  const UserStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  if (UserStatus === STATUS.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (UserStatus === STATUS.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  const UpdateHandle = (product) => {
    dispatch(SetTheUpdateData(product));
    navigate(`/update/${product?.id}`);
  };
  const deleteHandle = (id) => {
    dispatch(CreateDeleteData(id));
  };
  const addUserhandler = () => {
    navigate("/add");
  };

  return (
    <>
      <div className="productsWrapper">
        <button onClick={addUserhandler}>Add User</button>
        {UserData?.map((product) => (
          <div className="card" key={product?.id}>
            <h4>{product?.email}</h4>
            <h5 className="cardname">{product?.name}</h5>
            <button onClick={(e) => UpdateHandle(product)}>Edit</button>
            <button onClick={(e) => deleteHandle(product.id)}>Delete</button>
          </div>
        )).reverse()}
      </div>
    </>
  );
};

export default HomeComponent;
