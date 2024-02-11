import React from "react";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

import AxiosContext from "../../Services/context";
import Copyright from "../Copyright";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

export default function Products() {
  return (
	  <>
	  <div className="card" >
	  	<h1>wellcome</h1>
	  </div>
	  </>
  );
}
