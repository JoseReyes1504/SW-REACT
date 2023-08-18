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
        <Route path="/SignOn" element={<SignOn />} />
        <Route path="/Presentacion" element={<Presentacion />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Empresas" element={<Empresas />} />
        <Route path="/Fodas" element={<AllFoda />} />
        <Route path="/Foda" element={<Foda />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </Router>
  );
}

export default Routes;
