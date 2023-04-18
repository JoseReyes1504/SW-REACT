import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Navigate,
}
  from 'react-router-dom';

import PrivateRoute from './componentes/PrivateRoute';
import { Home } from './pages/Home/Home';
import { SignOn } from './pages/Login/SignOn';
import { Empresas } from './pages/admin/Empresas';
import { Foda } from './pages/Foda/Foda';
import { AllFoda } from './pages/Foda/AllFodas';
import { Presentacion } from './pages/Home/PaginaPresentacion';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/SignOn" element={<PrivateRoute><SignOn /></PrivateRoute>} />
        <Route path="/Presentacion" element={<PrivateRoute><Presentacion /></PrivateRoute>} />
        <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/Empresas" element={<PrivateRoute><Empresas /></PrivateRoute>} />
        <Route path="/Fodas" element={<PrivateRoute><AllFoda /></PrivateRoute>} />
        <Route path="/Foda" element={<PrivateRoute><Foda /></PrivateRoute>} />


        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </Router>
  );
}

export default Routes;
