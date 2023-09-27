import {  FerramentasDeDetalhes } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Dashboard =() =>{
  return(
    <LayoutBaseDePagina titulo='Página Inicial' barraDeFerramentas={(<FerramentasDeDetalhes btnSalvarFechar/>)}>Testando</LayoutBaseDePagina>
  );
};