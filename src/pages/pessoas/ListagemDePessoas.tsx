
import { LayoutBaseDePagina } from '../../shared/layouts';
import { BarraDeFerramentas } from '../../shared/components/barra-de-ferramentas/BarraDeFerramentas';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { IListagemPessoa, PessoasService } from '../../shared/service/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas: React.FC =() =>{
  const[searchParams, setSearchParams] = useSearchParams();
  const {debounce} = useDebounce(3000);

  const [row, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const busca = useMemo(()=>{
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(()=>{
    setLoading(true);
    debounce(() => {
      PessoasService.getAll(1,busca)
        .then((result) => {
          setLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else { 
            console.log(result);
            setRows(result.data);
            setTotalCount(result.totalCount);          }
        });
    });
  },[busca]);

  
  
  

  return(
    <LayoutBaseDePagina titulo='Listagem de Pessoas' barraDeFerramentas={(<BarraDeFerramentas textoBtn='Nova' mostrarInputBusca
      textoDaBusca={busca}
      aoMudarBusca={texto => setSearchParams({busca: texto}, {replace:true})}
    />)}>
      <TableContainer component={Paper} variant='outlined' sx={{m:1, width:'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate'/>
                </TableCell>
              </TableRow>          
            )}
          </TableFooter>
        </Table>
      </TableContainer>      
    </LayoutBaseDePagina>
  );
};