/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Divider, Drawer,  Icon,  List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { ListItemLink } from './ListMenu';

interface MenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const {toggleTheme} = useAppThemeContext();

  return (
    <>
      <Drawer variant={ smDown? 'temporary' : 'permanent'} open={isDrawerOpen} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://yt3.ggpht.com/grfYgQadT8iNg9WPb-jkrKB-9224y_DBDXAOtV4Yt7cyQmtR47J_453uveQOTDsp_dRSH851TMM=s108-c-k-c0x00ffffff-no-rj"
            />
          </Box>

          <Divider />

          <Box flex={1} >         
            <List component="nav">            
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}    
            </List>
          </Box>
          <Box>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <Icon>dark_mode</Icon>
              </ListItemIcon>
              <ListItemText>Alternar tema</ListItemText>
            </ListItemButton>      
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={ smDown? 0: theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};