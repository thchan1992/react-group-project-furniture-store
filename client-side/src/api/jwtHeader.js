export const jwt = () => {
  const config = {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  };
  return config;
};

export const jwt_img = () => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  return config;
};
