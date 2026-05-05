import axios from "../utils/axiosCustomize";

const getDashboardOverview = () => {
  return axios.get("api/v1/overview");
};

export { getDashboardOverview };
