import jwtDecode from "jwt-decode";

import setAxiosAuthToken from "./setAxiosAuthToken";
const checkIfUserIsAuth = () => {
  //check if token exists, if it doesnt exists return false
  //if it does exists, check if token valid (meaning not expired)
  //if expired return false
  //else return true
  let getJwtToken = window.localStorage.getItem("jwtToken");
  if (getJwtToken) {
    const currentTime = Date.now() / 1000;
    let decodedToken = jwtDecode(getJwtToken);

    if (decodedToken.exp < currentTime) {
      setAxiosAuthToken(null);
      return false;
    } else {
      setAxiosAuthToken(getJwtToken);
      return true;
    }
  } else {
    return false;
  }
};
export default checkIfUserIsAuth;
/*
In order to use less code, we created one function that will check if a user is not only authorized, but actively has a token for login
our token will either be expired, or active.
we will use this function across various other components
*/
