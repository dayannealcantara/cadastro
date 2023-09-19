
import { LayoutBaseDePagina } from '../../shared/layouts';
import { BarraDeFerramentas } from '../../shared/components/barra-de-ferramentas/BarraDeFerramentas';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { PessoasService } from '../../shared/service/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';

export const ListagemDePessoas: React.FC =() =>{
  const[searchParams, setSearchParams] = useSearchParams();
  const {debounce} = useDebounce(3000);

  const busca = useMemo(()=>{
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(()=>{
    debounce(() => {
      PessoasService.getAll(1,busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else { 
            console.log(result);
          }
        });
    });
  },[busca]);

  
  
  

  return(
    <LayoutBaseDePagina titulo='Listagem de Pessoas' barraDeFerramentas={(<BarraDeFerramentas textoBtn='Nova' mostrarInputBusca
      textoDaBusca={busca}
      aoMudarBusca={texto => setSearchParams({busca: texto}, {replace:true})}
    />)}>Testando</LayoutBaseDePagina>
  );

};