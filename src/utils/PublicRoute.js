import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {

  const user = sessionStorage.getItem("mydata");

  if (user) { return <Navigate to="/" replace />;}

  return children;
};

export  const CheckoutRoute =({ children })=> {

  const userSession = sessionStorage.getItem("mydata");

  if (!userSession) {
      return <Navigate to="/Login" />;
  }
  // Check Cart Items
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
      return <Navigate to="/Cart" />;
  }

  return children;
}

export default PublicRoute;