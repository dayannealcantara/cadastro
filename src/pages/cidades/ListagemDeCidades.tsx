
import { LayoutBaseDePagina } from '../../shared/layouts';
import { BarraDeFerramentas } from '../../shared/components/barra-de-ferramentas/BarraDeFerramentas';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const ListagemDeCidade : React.FC =() =>{
  const[searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(()=>{
    return searchParams.get('busca') || '';
  },[searchParams]);
  return(
    <LayoutBaseDePagina titulo='Listagem de Cidades' barraDeFerramentas={(<BarraDeFerramentas textoBtn='Nova' mostrarInputBusca
      textoDaBusca={busca}
      aoMudarBusca={texto => setSearchParams({busca: texto}, {replace:true})}
    />)}>Testando</LayoutBaseDePagina>
  );

};