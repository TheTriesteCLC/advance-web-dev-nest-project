import Cookies from "js-cookie";

const removeDoubleQuotes = (str: string) => {
    
  if (str === undefined) return "";
  return str.replace(/"/g, "");
};
const GetCookie = (name:string) => {
  const cookie = Cookies.get(name);
  const newCookie = removeDoubleQuotes(cookie || "");
  return newCookie;
};

export default GetCookie;
