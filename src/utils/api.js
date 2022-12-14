import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
});

export const GetData = async () => {
  try {
    const resData = await apiClient.get("/users");
    return {
      success: true,
      status: 200,
      data: resData,
    };
  } catch (exception) {
    return { error: true, exception };
  }
};

export const ApiAddData = async (data) => {
  try {
    const resData = await apiClient.post("/users", data);
    return {
      success: true,
      status: 200,
      data: resData,
    };
  } catch (exception) {
    return { error: true, exception };
  }
};

export const DeleteData = async (id) => {
  try {
    const resData = await apiClient.delete("/users/" + id);
    return {
      success: true,
      data: resData,
    };
  } catch (exception) {
    return { error: true, exception };
  }
};

// Update the data

export const UpdateDataApi = async (query) => {
  try {
    const body = {
      id: query.id,
      name: query.name,
      email: query.email,
    };
    const resData = await apiClient.put(`/users/${body.id}`, body);
    return resData;
  } catch (exception) {
    return { error: true, exception };
  }
};
