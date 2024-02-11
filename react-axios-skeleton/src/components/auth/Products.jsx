
import React from "react";
import {products} from "./p.js";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

import AxiosContext from "../../Services/context";
import Copyright from "../Copyright";

const prods = products;

export default function Products() {
  return (
	  <div className = "cc" >
	  {products.map((e)=>{
		return(<div className = "card">
			<img src = {e.image} alt = "" />
			<h3> {e.title}</h3>
			<p> {"price " + e.price}</p>
			<p> {e.category}</p>
			<p> {e.rating.rate+ " "+ e.rating.count + " star"}</p>
			<p> {e.description}</p>

			</div>)	
	  	})}
		  </div>
  );
}
