
import { Box, Button, Paper, useTheme, Icon} from '@mui/material';


interface IFerramentasDeDetalhesProps { 
  textoBtn?: string;
  btnNovo?: boolean; 
  btnVoltar?: boolean; 
  btnApagar?: boolean; 
  btnSalvar?: boolean; 
  btnSalvarFechar?: boolean; 
  aoClicarNovo?: (()=> void) 
  aoClicarVoltar?: (()=> void) 
  aoClicarApagar?: (()=> void) 
  aoClicarSalvar?: (()=> void) 
  aoClicarSalvarFechar?: (()=> void) 
}


export const FerramentasDeDetalhes : React.FC<IFerramentasDeDetalhesProps > = ({textoBtn='Novo',
  btnApagar=true, 
  btnNovo=true, 
  btnSalvar=true,
  btnSalvarFechar=false, 
  btnVoltar=true,
  aoClicarApagar,
  aoClicarNovo,
  aoClicarSalvar,
  aoClicarSalvarFechar,
  aoClicarVoltar}) => {  
  const theme = useTheme();

  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper}> 
        
      {btnSalvar &&(<Button variant='contained' disableElevation color='primary' endIcon={<Icon>save</Icon>} onClick={aoClicarSalvar}>Salvar</Button>)}

      {btnSalvarFechar && (<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>save</Icon>} onClick={aoClicarSalvarFechar}>Salvar e Voltar</Button>)}

      {btnApagar &&(<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>delete</Icon>} onClick={aoClicarApagar}>Apagar</Button>)}

      {btnNovo &&(<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>add</Icon>} onClick={aoClicarNovo}>{textoBtn}</Button>)} 

      {btnVoltar &&(<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>arrow_back</Icon>} onClick={aoClicarVoltar}>Voltar</Button>)}  
    </Box>
  );
};