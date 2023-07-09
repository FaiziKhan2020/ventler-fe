// import dotenv from "dotenv";
export const getBaseApi = () => {
  return process.env.REACT_APP_BASE_API || "https://kyoungbackend-1-s4948719.deta.app/";
};
