import{BrowserRouter} from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';
import './shared/forms/TraducoesYup';
import { AuthProvider } from './shared/contexts/AuthContext';
import { Login } from './shared/components/login/Login';


export const App =()=> {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter> 
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider> 
  );
};


