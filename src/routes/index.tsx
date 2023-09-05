import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import {  useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  // const {toggleTheme} = useAppThemeContext();
  const { toggleDrawerOpen} = useDrawerContext();

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Definir cor de fundo</Button>}/>
      <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
    </Routes>
  );
};