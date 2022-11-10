/** @format */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ element }) => {
  // @ts-ignore
  const { isLogin } = useSelector((state) => state.app);

  if (isLogin) return element;
  else return <Navigate to={`/login`} replace />;
};

export default ProtectedPage;
