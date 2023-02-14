import axios from "axios";
let devmode = false;
let url;
const development_url = "http://localhost";
const development_port = 8080;
const production_url = window.location.origin;
console.log("production url" + production_url);
console.log(window.location.origin);
axios.defaults.withCredentials = true;

if (devmode || process.env.NODE_ENV === "development") {
  url = development_url;
  if (url.charAt(url.length - 1) === "/") {
    url = url.substring(0, url.length - 1);
  }
  url = url + ":" + development_port + "/";
} else {
  url = production_url;
  if (url.charAt(url.length - 1) !== "/") {
    url = url + "/";
  }
}

const getUser = async () => {
  return await axios.get(url + "getUser");
};

const generateReport = async (zipFiles) => {
  return await axios.post(url + "generateReport", { zipFiles: zipFiles });
};

const login = async (username, password) => {
  return await axios.post(url + "login", {
    username: username,
    password: password,
  });
};

const signup = async (username, password) => {
  return await axios.post(url + "signup", {
    username: username,
    password: password,
  });
};

const facebookLogin = async (id, username) => {
  return await axios.post(url + "facebookLogin", {
    username: username,
    facebookId: id,
  });
};

const googleLogin = async (id, username) => {
  return await axios.post(url + "googleLogin", {
    username: username,
    googleId: id,
  });
};

const logout = async () => {
  return await axios.post(url + "logout");
};

const ping = async () => {
  return await axios.get(url + "ping");
};

const upload = async (formData) => {
  return axios.post(url + "upload", formData);
};

const getZipFileMetadata = async () => {
  return await axios.get(url + "overview/zipfiles");
};

const getErrorTypes = async (id) => {
  return await axios.get(url + "ErrorTypes?id=" + id);
};

const getErrorTypesPY = async (id) => {
  return await axios.get(url + "PYErrorTypes?id=" + id);
};

const getErrorTypesNum = async () => {
  return await axios.get(url + "ErrorTypesNum");
};

const getPYErrorIDs = async () => {
  return await axios.get(url + "PYErrorIDs");
};

const getZipFile = async (id) => {
  return await axios.get(url + "studentfiles?id=" + id);
};

const deleteDatabase = async () => {
  return await axios.delete(url + "deleteAll");
};

const deleteZipFolder = async (id) => {
  console.log(`API JS Says ` + id);
  return await axios.delete(url + "deleteZipFolder?id=" + id);
};

export {
  getZipFileMetadata,
  getZipFile,
  login,
  signup,
  logout,
  ping,
  upload,
  getErrorTypes,
  getErrorTypesPY,
  getErrorTypesNum,
  getPYErrorIDs,
  deleteZipFolder,
  generateReport,
  getUser,
  facebookLogin,
  googleLogin,
};
