import React from "react";
import { useRoutes } from "react-router-dom";
import Router from "./routes/router";
import { checkAutoLogin } from "./app/auth/auth.service";


const App = () => {
  const routing = useRoutes(Router(checkAutoLogin()));
  return <div>{routing}</div>;
};

export default App;
