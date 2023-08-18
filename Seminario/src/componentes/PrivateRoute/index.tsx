import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Slices/types';

import { PropsWithChildren } from "react";

const PrivateRoute = ({ children, allowedRoles = [] }: PropsWithChildren<{ allowedRoles?: string[] }>) => {
  
  const user = useSelector((state: RootState) => {
    return state.auth.token;
  });    

  if (user) {
    try {
      const token = user;
      if (!token) {
        return <Navigate to="/login" replace />
      }
      //  const matchedRoles = user.roles.filter((role:string) => allowedRoles.includes(role));

      //  if(matchedRoles.length == 0) {
      //    return <Navigate to="/noauthorized" replace />;
      //  }

    } catch (ex) {
      return <Navigate to="/home" replace />
    }
  } else {
    // console.log(token);
    // console.log("Entro en el else");
    return <Navigate to="/signOn" replace />
  }
  return children ? <>{children}</> : <Outlet />;
}

export default PrivateRoute;
