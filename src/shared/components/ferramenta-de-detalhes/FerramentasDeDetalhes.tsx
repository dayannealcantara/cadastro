
import { Box, Button, Paper, useTheme, Icon, Skeleton, Typography, useMediaQuery} from '@mui/material';


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
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper}> 
        
      {(btnSalvar && !carregandoBtnSalvar) && (
        <Button 
          variant='contained'
          disableElevation 
          color='primary'
          endIcon={<Icon>save</Icon>}
          onClick={aoClicarSalvar}
        >
          <Typography variant='button' textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}

      {carregandoBtnSalvar &&(<Skeleton width={110} height={60}/>)}

      {(btnSalvarFechar && !carregandoBtnSalvarFechar && !smDown && !mdDown)&& (
        <Button 
          variant='outlined' 
          disableElevation 
          color='primary' 
          endIcon={<Icon>save</Icon>} 
          onClick={aoClicarSalvarFechar}
        >
          <Typography variant='button' textOverflow="ellipsis" overflow="hidden">
            Salvar e Voltar
          </Typography>      
        </Button>
      )}

      {(carregandoBtnSalvarFechar && !smDown && !mdDown) &&(<Skeleton width={110} height={60}/>)}

      {(btnApagar && !carregandoBtnApagar) &&(
        <Button 
          variant='outlined'
          disableElevation 
          color='primary' 
          endIcon={<Icon>delete</Icon>}
          onClick={aoClicarApagar}
        >
          <Typography variant='button' textOverflow="ellipsis" overflow="hidden">
            Apagar
          </Typography>        
        </Button>
      )}

      {carregandoBtnApagar && (<Skeleton width={110} height={60}/>)}

      {(btnNovo && !carregandoBtnNovo && !smDown && !mdDown) &&(
        <Button variant='outlined' 
          disableElevation 
          color='primary' 
          endIcon={<Icon>add</Icon>} 
          onClick={aoClicarNovo}
        > 
          <Typography variant='button' textOverflow="ellipsis" overflow="hidden">
            {textoBtn}
          </Typography>        
        </Button>
      )} 

      {carregandoBtnNovo &&(<Skeleton width={110} height={60}/>)}

      {(btnVoltar && !carregandoBtnVoltar) &&(
        <Button 
          variant='outlined' 
          disableElevation
          color='primary' 
          endIcon={<Icon>arrow_back</Icon>} 
          onClick={aoClicarVoltar}
        >
          <Typography variant='button' textOverflow="ellipsis" overflow="hidden">
            Voltar
          </Typography>       
        </Button>
      )}  
      {carregandoBtnVoltar &&(<Skeleton width={110} height={60}/>)}
    </Box>
  );
};