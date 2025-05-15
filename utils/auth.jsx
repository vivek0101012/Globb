import jwt_decode from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
};
