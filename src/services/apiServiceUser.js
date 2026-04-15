import axios from "../utils/axiosCustomize";

const postCreateNewUser = (userName, role, email, password, selectedImage) => {
  // Data
  const data = new FormData();
  data.append("username", userName);
  data.append("role", role);
  data.append("email", email);
  data.append("password", password);
  data.append("userImage", selectedImage);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, userName, role, selectedImage) => {
  // Data
  const data = new FormData();
  data.append("id", id);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", selectedImage);
  return axios.put("api/v1/participant", data);
};

export { postCreateNewUser, getAllUsers, putUpdateUser };
