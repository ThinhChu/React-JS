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

const getUsersWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
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

const deleteUser = (userId) => {
  // Data
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

const postLoginUser = (email, password) => {
  // Data
  return axios.post("api/v1/login", { email, password });
  // {email : email, password : password}
};

const postRegisterUser = (email, username, password) => {
  // Data
  return axios.post("api/v1/register", { email, username, password });
  // {email : email, password : password}
};

const postLogoutUser = (email, refresh_token) => {
  return axios.post("api/v1/logout", { email, refresh_token });
};

const postUpdateProfile = (username, userImage) => {
  // Data
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", userImage);
  return axios.post("api/v1/profile", data);
};

const postChangePassword = (currentPassword, newPassword) => {
  return axios.post("api/v1/change-password", {
    current_password: currentPassword,
    new_password: newPassword,
  });
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUsersWithPaginate,
  postLoginUser,
  postRegisterUser,
  postLogoutUser,
  postUpdateProfile,
  postChangePassword,
};
