import API from "./api";

export const loginAdmin = async (username, password) => {

  const response = await API.post("/auth/login", {

    username,

    password,

  });

  return response.data;

};

export const logoutAdmin = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("admin");

};

export const saveLogin = (token, admin) => {

  localStorage.setItem("token", token);

  localStorage.setItem(

    "admin",

    JSON.stringify(admin)

  );

};

export const getAdmin = () => {

  return JSON.parse(

    localStorage.getItem("admin")

  );

};

export const getToken = () => {

  return localStorage.getItem("token");

};