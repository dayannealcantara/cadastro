
import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme} from '@mui/material';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string
  children: React.ReactNode
  barraDeFerramentas: React.ReactNode | undefined
}
export const LayoutBaseDePagina = ({titulo, children, barraDeFerramentas}: ILayoutBaseDePaginaProps) =>{
  const theme=useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const {toggleDrawerOpen} = useDrawerContext();

  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box padding={2} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>
        {smDown &&    
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        }     
        <Typography variant={ smDown ? 'h5': mdDown ? 'h4' : 'h3'} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>{titulo}</Typography>      
      </Box>
      { barraDeFerramentas &&
        <Box>
          {barraDeFerramentas}
        </Box>
      }
      <Box flex={1} overflow='auto'>
        <Typography>{children}</Typography>       
      </Box>
    </Box>
  );
};