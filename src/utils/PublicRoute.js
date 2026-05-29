import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem("mydata");

  return user ? children : <Navigate to="/Login" replace />;
};

export const PublicRoute = ({ children }) => {
  const user = sessionStorage.getItem("mydata");

  return user ? <Navigate to="/" replace /> : children;
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

