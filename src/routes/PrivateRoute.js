import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, element, auth }) => {
  return auth.token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
