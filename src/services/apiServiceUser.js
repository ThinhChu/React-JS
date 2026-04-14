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

export { postCreateNewUser, getAllUsers };
