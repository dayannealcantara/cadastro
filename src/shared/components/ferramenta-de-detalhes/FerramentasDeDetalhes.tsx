
import { Box, Button, Paper, useTheme, Icon, Skeleton} from '@mui/material';


interface IFerramentasDeDetalhesProps { 
  textoBtn?: string;
  btnNovo?: boolean; 
  btnVoltar?: boolean; 
  btnApagar?: boolean; 
  btnSalvar?: boolean; 
  btnSalvarFechar?: boolean; 
  carregandoBtnNovo?: boolean; 
  carregandoBtnVoltar?: boolean; 
  carregandoBtnApagar?: boolean; 
  carregandoBtnSalvar?: boolean; 
  carregandoBtnSalvarFechar?: boolean; 
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
  carregandoBtnApagar=false, 
  carregandoBtnNovo=false, 
  carregandoBtnSalvar=false,
  carregandoBtnSalvarFechar=false, 
  carregandoBtnVoltar=false,
  aoClicarApagar,
  aoClicarNovo,
  aoClicarSalvar,
  aoClicarSalvarFechar,
  aoClicarVoltar}) => {  
  const theme = useTheme();

  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper}> 
        
      {(btnSalvar && !carregandoBtnSalvar) && (<Button variant='contained' disableElevation color='primary' endIcon={<Icon>save</Icon>} onClick={aoClicarSalvar}>Salvar</Button>)}

      {carregandoBtnSalvar &&(<Skeleton width={110} height={60}/>)}

      {(btnSalvarFechar && !carregandoBtnSalvarFechar)&& (<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>save</Icon>} onClick={aoClicarSalvarFechar}>Salvar e Voltar</Button>)}

      {carregandoBtnSalvarFechar &&(<Skeleton width={110} height={60}/>)}

      {(btnApagar && !carregandoBtnApagar) &&(<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>delete</Icon>} onClick={aoClicarApagar}>Apagar</Button>)}

      {carregandoBtnApagar && (<Skeleton width={110} height={60}/>)}

      {(btnNovo && !carregandoBtnNovo)&&(<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>add</Icon>} onClick={aoClicarNovo}>{textoBtn}</Button>)} 

      {carregandoBtnNovo &&(<Skeleton width={110} height={60}/>)}

      {(btnVoltar && !carregandoBtnVoltar) &&(<Button variant='outlined' disableElevation color='primary' endIcon={<Icon>arrow_back</Icon>} onClick={aoClicarVoltar}>Voltar</Button>)}  
      {carregandoBtnVoltar &&(<Skeleton width={110} height={60}/>)}
    </Box>
  );
};