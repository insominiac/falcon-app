import * as React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar'
import F9Staking from './F9Staking';
import ShibaStaking from './ShibaStaking'
import Approve from './Approve'
import Token from '../contracts/Token';
import Register from './Register'




let Web3 = require('web3');


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));





const mdTheme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
  
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [allowance,SetAllowance] = useState('');


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };


  const CheckConnection = () => {
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)

   

    useEffect(() => {
      const allow = async() =>{

        const accounts = await web3.eth.getAccounts();
        const stakeadrss = '0x413B10177a29E5D85c86A516d9E6254D265Dc5Ee'
        const Allowance  =  await Token.methods.allowance(accounts[0],stakeadrss).call()

        SetAllowance(Allowance);

    }

        window.ethereum ?
          // eslint-disable-next-line no-undef
          ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
            setAddress(accounts[0])
            // eslint-disable-next-line no-undef
            let w3 = new Web3(ethereum)
            setWeb3(w3)
          }).catch((err) => console.log(err))
        : alert("Please install MetaMask")

      }, [], console.log(web3)
      )
     
    if(web3 !== null){
     return(<span>{address.substring(0, 10)}</span>)
    }
    
    else{

     return('not connected')

    }
    
    

  }
  console.log(allowance)

  return (
    <ThemeProvider theme={mdTheme} >

      <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <AppBar  sx={{backgroundColor:'transparent',zIndex:'10',position:'absolute',
    top: '10px',
    width: '100%',
    marginLeft: '0',
    boxShadow:'none',
   
  }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              align="left"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            <Avatar alt="logo" src="//images.squarespace-cdn.com/content/v1/60fa08eab75c75498c2a849e/575eaf55-670e-47e6-bb4b-05a312ad4d23/F9+Logo+%2B+Text+.png?" style={{width:150, height: 35,borderRadius:0}}/>
            </Typography>
          
           <Link href="#" align="right" color="#fff" borderRadius="100px" border="1px" bgcolor="#6583fb" padding="10px 20px 10px 20px">
              <CheckConnection/>   
              </Link>       
          </Toolbar>
        </AppBar>
      
        <Box
          component="main"
          sx={{
           // backgroundColor:'#282c34',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            backgroundImage:`url(https://images.squarespace-cdn.com/content/v1/60fa08eab75c75498c2a849e/54cc5c04-e468-4904-8d62-082773308030/Screen+Shot+2021-09-15+at+6.50.54+PM.png?format=2500w)`
          }}
        >
          <Toolbar />
        
          <Container maxWidth="md" sx={{ mt:1, mb: 4 }}>
            <Approve/>
          <Box>

          <Tabs
          value={value}
          onChange={handleChange}
         // indicatorColor="#fff"
          //textColor="white"
          style ={{minHeight:'0'}}
          
        >
          <Tab label="F9 Stake"  style={{height: "2em"}} sx={{ width:'13em',padding: '0.4em',minHeight:'0px',fontWeight:'bold',bgcolor:'#fff',color:'#000',borderRadius: '3em 3em 0 0',border: '0.3em solid rgba(8,67,134,.199)'}}{...a11yProps(0)} />
          <Tab label="Shiba Stake" style={{height: "2em"}} sx={{ width:'13em',padding: '0.4em',minHeight:'0px',fontWeight:'bold',bgcolor:'#fff',color:'#000',borderRadius: '3em 3em 0 0',border: '0.3em solid rgba(8,67,134,.199)'}} {...a11yProps(1)} />
          <Tab label="Register IDO" style={{height: "2em"}}  sx={{ width:'13em',padding: '0.4em',minHeight:'0px',fontWeight:'bold',bgcolor:'#fff',color:'#000',borderRadius: '3em 3em 0 0',border: '0.3em solid rgba(8,67,134,.199)'}} {...a11yProps(2)} />
          <Tab label="Sale" style={{height: "2em"}}  sx={{ width:'13em',padding: '0.4em',minHeight:'0px',fontWeight:'bold',bgcolor:'#fff',color:'#000',borderRadius: '3em 3em 0 0',border: '0.3em solid rgba(8,67,134,.199)'}} {...a11yProps(2)} />
        </Tabs>
        </Box>
          <Box sx={{ bgcolor: '#0a2549', height: '50vh', borderRadius:'10px',boxShadow:'0 0 800px 20px rgb(19 75 99 / 44%'}}>
         
        <TabPanel value={value} index={0} dir={theme.direction}>
          <F9Staking/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ShibaStaking/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Register/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item four
        </TabPanel>
        </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {

  return <DashboardContent />;
}
