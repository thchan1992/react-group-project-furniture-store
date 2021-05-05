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

// import { authChecker } from "../../Utility/authChecker";

// import { useHistory } from "react-router-dom";

// const history = useHistory();

// if (response.data.error) {
//   messageSetter(response.data.error, "danger", true);
//   return;
// }
// authChecker(history, response, true);

// if (response.data.error) {
//   messageSetter(response.data.error, "danger", true);
//   return;
// }
// authChecker(history, response, false);

//
// if (response.data.error) {
//   messageSetter(response.data.error, "danger", true);
//   return;
// } else if (response.data.message) {
//   messageSetter(response.data.message, "success", true);
// }
// authChecker(history, response, false);
