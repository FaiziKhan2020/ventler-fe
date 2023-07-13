// import dotenv from "dotenv";
export const getBaseApi = () => {
  return process.env.REACT_APP_BASE_API || "https://ventler-br.onrender.com/";
};
