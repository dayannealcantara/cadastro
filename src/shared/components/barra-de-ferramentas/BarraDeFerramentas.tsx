
import { Box, Button, Paper, TextField, useTheme, Icon } from '@mui/material';


interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean; 
  aoMudarBusca?: ((novoTexto: string)=> void) 
  textoBtn?: string;
  mostrarBtn?: boolean; 
  aoClicarBtn?: (()=> void) 
}


export const BarraDeFerramentas : React.FC<IBarraDeFerramentasProps> = ({textoDaBusca ='', 
  mostrarInputBusca=false, 
  aoMudarBusca, 
  textoBtn='Novo', 
  mostrarBtn = true, 
  aoClicarBtn}) => {  
  const theme = useTheme();

  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper}>

      {mostrarInputBusca &&
      (<TextField size='small' placeholder='Pesquisar...' value={textoDaBusca} onChange={(e)=> aoMudarBusca?.(e.target.value)}/>)
      }

      <Box flex={1} display="flex" justifyContent="end"> 
        {mostrarBtn &&
         (<Button variant='contained' disableElevation color='primary' endIcon={<Icon>add</Icon>} onClick={aoClicarBtn}>{textoBtn}</Button>)
        }
      </Box>
     
    </Box>
  );
};