import axios from "axios";
import AxiosConfig from "./config";

export default class Axios {
  constructor() {
    this.auth = axios.create(AxiosConfig);
  }

  // *** Auth API ***
  createUserWithEmailAndPassword = (name, email, password) =>
    this.auth.post("/register", { name, email, password });

  signInWithEmailAndPassword = (email, password) =>
    this.auth.post("/login", { email, password });
}
