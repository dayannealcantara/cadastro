import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from '../pages';
import { ListagemDeCidades } from '../pages/cidades/ListagemDeCidades';
import { DetalheDeCidades } from '../pages/cidades/DetalheDeCidades';

export const AppRoutes = () => {
  const {  setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidades',
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard/>} />

      <Route path="/pessoas" element={<ListagemDePessoas/>} />
      <Route path="/pessoas/detalhes/:id" element={<DetalheDePessoas/>} />

      <Route path="/cidades" element={<ListagemDeCidades/>} />
      <Route path="/cidades/detalhes/:id" element={<DetalheDeCidades/>} />
      
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};