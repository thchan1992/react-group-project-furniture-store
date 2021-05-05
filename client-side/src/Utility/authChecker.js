//handler that handles the situation where the user is failed to authen
export const authChecker = (history, response, withRes) => {
  if (withRes == true) {
    if (!response.data.result || response.data.auth == false) {
      history.push("/error");
      window.location.reload(false);
    }
  } else {
    if (response.data.auth == false) {
      history.push("/error");
      window.location.reload(false);
    }
  }
};
