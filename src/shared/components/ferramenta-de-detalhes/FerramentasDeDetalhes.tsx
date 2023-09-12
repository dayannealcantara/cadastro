
import { Box, Button, Paper, useTheme, Icon} from '@mui/material';

export const FerramentasDeDetalhes : React.FC = () => {  
  const theme = useTheme();

  return (
    <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper}>     
      <Button variant='contained' disableElevation color='primary' endIcon={<Icon>save</Icon>}>Salvar</Button>
      <Button variant='outlined' disableElevation color='primary' endIcon={<Icon>save</Icon>}>Salvar e Voltar</Button>
      <Button variant='outlined' disableElevation color='primary' endIcon={<Icon>delete</Icon>}>Apagar</Button>
      <Button variant='outlined' disableElevation color='primary' endIcon={<Icon>add</Icon>}>Novo</Button>   
      <Button variant='outlined' disableElevation color='primary' endIcon={<Icon>arrow_back</Icon>}>Voltar</Button>     
    </Box>
  );
};