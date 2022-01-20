
import * as React from 'react';
import {useState, useEffect,useCallback} from 'react';
import PropTypes from 'prop-types';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Modal from '@mui/material/Modal';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@material-ui/core/Avatar'
import Web3 from 'web3';
import Staking from './Staking';
import F9Staking from './components/F9Staking';
import ShibaStaking from './components/ShibaStaking'
import Approve from './components/Approve'
import F9Token from './contracts/F9Token';
import ShibaToken from './contracts/ShibaToken'
import Register from './components/Register'
import './App.css';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Crowdsale from './contracts/Crowdsale';


//import Dashboard from './components/Dashboard';


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
          <Container>{children}</Container>
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



function App() {

  const [account, setAccount] = useState('Connecting..');
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const [allowance,SetAllowance] = useState('');
  const [amount,setAmount] = useState('');
  const [openapprove,setOpenApprove] = useState(true);
  const [walletbalance,setWalletBalance] = useState('');
  const [shibwalletbalance,setShibWalletBalance] = useState('');
  //const [allowance,SetAllowance] = useState('');
  const [f9disable, setF9Disable] = React.useState(true);
  const [shibadisable, setShibaDisable] = React.useState(true);
  const [f9stakedbalance,setF9StakedBalance] = useState('');
  const [shibastakedbalance,setShibaStakedBalance] = useState('');
  const [unlocktime, setUnlockTime] = useState('');
  const [totalSupply,setTotalSupply] = useState('');
  const [isf9staked,setIsF9Staked] = useState('');
  const [issshibastaked,setIsShibaStaked] = useState('');
  const [getsale,SetGetSale] = useState('');
  const [mopen, setMOpen] = React.useState(true);
  const [transition, setTransition] = React.useState(undefined);
  const stakeadrss =  '0x793C4F373859d6889df78113C00Ed25f1BaAd236'
  const f9token ='0xd72e140891b2E09690920633AA0DF43545a3cA88'
  const shibatoken ='0xd4Ca18BE80f941f1EC8ccDf172c4C5125234Ba99'

  const handleMClose = () => setMOpen(false);

  

  useEffect(() => {
  const init = async () => {
   // const accounts = await web3.eth.getAccounts();
    const ethereum = window.ethereum;
    console.log(ethereum)
    if(ethereum){
      ethereum.on('accountsChanged',function(accounts){
        setAccount(accounts[0])
         
      })
    }

    
    if (ethereum) {
      // await window.ethereum.send('eth_requestAccounts');
      await ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(ethereum);

      //connecting to metamask
      let web3 = window.web3;
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0]);


      const balance = await F9Token.methods.balanceOf(accounts[0]).call()
      setWalletBalance(Web3.utils.fromWei(balance,'gwei'));
      
      const shibbalance = await ShibaToken.methods.balanceOf(accounts[0]).call()
      setShibWalletBalance(shibbalance);
  
      const stakebalance = await Staking.methods.stakedBalance(f9token,accounts[0]).call()
      setF9StakedBalance(Web3.utils.fromWei(stakebalance,'gwei'));

      const shibastakebalance = await Staking.methods.stakedBalance(shibatoken,accounts[0]).call()
      setShibaStakedBalance(shibastakebalance);
  
      const unlocktime = await Staking.methods.unlockTime(accounts[0]).call()
      setUnlockTime(unlocktime);
  
      const Allowance  =  await F9Token.methods.allowance(accounts[0],stakeadrss).call()
      SetAllowance(Allowance);
  
      const supply = await F9Token.methods.totalSupply().call()
      setTotalSupply(supply);
  
      const shibastaked = await Staking.methods.isShibaStaked(accounts[0]).call()
      setIsShibaStaked(shibastaked);
     
       // console.log(issshibastaked)
      //console.log(isf9staked)
  
      const f9staked= await Staking.methods.isF9Staked(accounts[0]).call()
      setIsF9Staked(f9staked);
  
      setLoader(false);

      const sale = await Crowdsale.methods.getSalePhase().call();
      SetGetSale(sale);

    }else if (!window.web3) {
      // setAppStatus(false);
       setAccount('Connect Wallet');
       alert('Please Install Metamask')
       setLoader(false);
     }
  /*
    const balance = await web3.eth.getBalance(accounts[0]);
    setWalletBalance(balance);
    */

}
  init();

}, [account]);



function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const handleClose = () => {
  setOpenApprove(false);
};



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  const CheckConnection = () => {

    if(walletbalance || shibwalletbalance === '0'){
  
      alert('Insufficiet Tokens');
      
      }
      else{
        alert(' Tokens');
      }
    
  }
  

  const inputHandler = (received) => {
    setAmount(received);
  };

  
  const Stake = (Transition) => async() => {
    if (!amount || amount === '0' || amount < 0) {
     // alert('Invalid Token');
      setTransition(() => Transition);
      setOpen(true);

    }

    else
    
    {
    
      await Staking.methods.f9Stake(Web3.utils.toWei(amount,'gwei')).send({from:account}).on('sending',function(){
        setLoader(true);

      }).on('confirmation', async() => {
        
        
        setLoader(false);

        const newstakebalance = await Staking.methods.stakedBalance(f9token,account).call()
        setF9StakedBalance(Web3.utils.fromWei(newstakebalance,'gwei'))

        const balance = await F9Token.methods.balanceOf(account).call()
        setWalletBalance(Web3.utils.fromWei(balance,'gwei'));

        const unlocktime = await Staking.methods.unlockTime(account).call()
        setUnlockTime(unlocktime);
      
       }).on('error',function(){
        setLoader(false);
        alert('Trasaction Denied');
       
       
       }).then(() =>{
        setShibaDisable(true)
        console.log(f9stakedbalance)
      })
    /*
    await Staking.methods.f9Stake(Web3.utils.toWei(amount)).send({from:account}).on('confirmation', (confirmationNumber, receipt,transactionHash) => {
        setShibaDisable(true)
        console.log(walletbalance)
        console.log(transactionHash)
        setAmount('');


    })
  */
    }

  }
  
  
  const UnStake = (Transition) => async() => {
    if (!amount || amount === '0' || amount < 0) {
      setAmount('');
     // alert('Invalid Token');
      setTransition(() => Transition);
      setOpen(true);
    }else{
    await Staking.methods.f9Unstake(Web3.utils.toWei(amount,'gwei')).send({from:account}).on('sending', async() => {
      setLoader(true);
    
      }).on('confirmation', async() => {
        setLoader(false);
        const newstakebalance = await Staking.methods.stakedBalance(f9token,account).call();
      setF9StakedBalance(Web3.utils.fromWei(newstakebalance,'gwei'));
      const balance = await F9Token.methods.balanceOf(account).call();
      setWalletBalance(Web3.utils.fromWei(balance,'gwei'));
      const unlocktime = await Staking.methods.unlockTime(account).call();
      setUnlockTime(unlocktime);
      setLoader(false);
      console.log('Rejected');
       }).then(()=>{
        setShibaDisable(false);
      });
      }
      }

  const StakeT0 = async() => {
 
      await Staking.methods.shibaStake(0).send({from:account}).on('confirmation',async() =>{
      const shibastakebalance = await Staking.methods.stakedBalance(shibatoken,account).call()
      setShibaStakedBalance(shibastakebalance);
      const balance = await F9Token.methods.balanceOf(account).call()
      setWalletBalance(balance);
      const unlocktime = await Staking.methods.unlockTime(account).call()
      setUnlockTime(unlocktime);
    }).then(res =>{
      console.log(res)
    }).catch( (err) =>{
      console.log(err );
  });
    
  }
  
  const StakeT1 =  async() => {
   
    await Staking.methods.shibaStake(1).send({from:account}).on('confirmation',async() =>{
    const shibastakebalance = await Staking.methods.stakedBalance(shibatoken,account).call()
    setShibaStakedBalance(shibastakebalance);
    const balance = await F9Token.methods.balanceOf(account).call();
    setWalletBalance(balance);
    const unlocktime = await Staking.methods.unlockTime(account).call();
    setUnlockTime(unlocktime);

  }).then(res =>{
      console.log(res);
    }).catch( (err) =>{
      console.log(err );
  });
  
    
  }
  
  const StakeT2 = async() => {
  
    await Staking.methods.shibaStake(2).send({from:account}).on('confirmation',async() =>{

      const shibastakebalance = await Staking.methods.stakedBalance(shibatoken,account).call();
      setShibaStakedBalance(shibastakebalance);
      const balance = await F9Token.methods.balanceOf(account).call();
      setWalletBalance(balance);
      const unlocktime = await Staking.methods.unlockTime(account).call();
      setUnlockTime(unlocktime);

    }).then(res =>{
      console.log(res);
    }).catch( (err) =>{
      console.log(err );
  });
  
    
  }
  
  const UnStakeShiba = async() => {
   // console.log(issshibastaked)
   // console.log(isf9staked)
  
    await Staking.methods.shibaUnstake().send({from:account}).on('confirmation',async() =>{
      
      const shibastakebalance = await Staking.methods.stakedBalance(shibatoken,account).call();
      setShibaStakedBalance(shibastakebalance);
      const balance = await F9Token.methods.balanceOf(account).call();
      setWalletBalance(balance);
      const unlocktime = await Staking.methods.unlockTime(account).call();
      setUnlockTime(unlocktime);

    }).then(res =>{
      console.log(res);
    }).catch( (err) =>{
      console.log(err );
  });
  
  }

  return (
    
    <ThemeProvider theme={mdTheme} >
      <Box sx={{ display: 'flex'}} >
        <CssBaseline />
        {loader? 
        <Modal
        open={mopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={{ position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 400,
                          bgcolor: '#0a2549',
                          border: '1px solid #fff',
                          borderRadius:'10px',
                          boxShadow: 24,
                          pt: 2,
                          px: 4,
                          pb: 3,}} >
        <Container maxWidth="md" sx={{textAlign:'center'}}>
        <CircularProgress />
        <Typography
                                    component="p"
                                    variant="p"
                                    align="center"
                                    color="#fff"
                                    fontWeight="bold"
                                    fontFamily ='Poppins'
                                  >
                                   Waiting For Confirmation
                                  </Typography>
        </Container>
      </Box>
      </Modal>
        :null}

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
           
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              align="left"
              noWrap
              sx={{ flexGrow: 1 }}
            
            >
              <Link href="https://www.f9launch.com/">
            <Avatar alt="logo"  src="//images.squarespace-cdn.com/content/v1/60fa08eab75c75498c2a849e/575eaf55-670e-47e6-bb4b-05a312ad4d23/F9+Logo+%2B+Text+.png?" style={{width:150, height: 35,borderRadius:0}}/>
            </Link>
            </Typography>
          
           <Link className="accnt-addrs" href="#" align="right" fontFamily="Poppins" color="#fff" borderRadius="100px" border="1px" bgcolor="#6583fb" padding="10px 20px 10px 20px">
              {account.substring(0, 15)} 
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
          <Container className='main-container' maxWidth="md" sx={{ mt:1, mb: 4 }}>
          <Box>
          <Tabs
          value={value}
          onChange={handleChange} 
         // indicatorColor="#fff"
          //textColor="white"
          style ={{minHeight:'0'}}
          
        >
          <Tab label="F9"   style={{height: "2em"}} sx={{ fontFamily:'Poppins',width:'13em',padding: '0.4em',minHeight:'0px',fontWeight:'bold',bgcolor:'#fff',color:'#000',borderRadius: '3em 3em 0 0',border: '0.3em solid rgba(8,67,134,.199)'}}{...a11yProps(0)} />
          <Tab label="Shiba Inu"  style={{height: "2em"}} sx={{ fontFamily:'Poppins',width:'13em',padding: '0.4em',minHeight:'0px',fontWeight:'bold',bgcolor:'#fff',color:'#000',borderRadius: '3em 3em 0 0',border: '0.3em solid rgba(8,67,134,.199)'}} {...a11yProps(1)} /> 
        </Tabs>
        </Box>
        <Box sx={{ bgcolor: '#0a2549', height: '100vh', borderRadius:'10px',boxShadow:'0 0 800px 20px rgb(19 75 99 / 44%'}}>
        <TabPanel value={value} index={0} dir={theme.direction} style={{backgroundColor:'#0a2549'}}> 
          <F9Staking
            account = {account}
            walletbalance ={walletbalance}
            f9stakedbalance = {f9stakedbalance}
            unlocktime = {unlocktime}
            Stake = {Stake(TransitionUp)}
            UnStake = {UnStake(TransitionUp)}
            inputHandler={inputHandler}
            getsale = {getsale}
            stakeadrss={stakeadrss}
            f9token = {f9token}
            shibatoken = {shibatoken}
            
          />
           <Snackbar
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    //message="Enter a Valid Number"
                    key={transition ? transition.name : ''}
                  >
                  <Alert severity="error">Enter a Valid Number</Alert>
            </Snackbar>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} style={{backgroundColor:'#0a2549'}}>
          <ShibaStaking
           account = {account}
           shibwalletbalance ={shibwalletbalance}
           shibastakedbalance = {shibastakedbalance}
           unlocktime = {unlocktime}
           StakeT0 ={StakeT0}
           StakeT1 ={StakeT1}
           StakeT2 ={StakeT2}
           UnStakeShiba ={UnStakeShiba}
           getsale = {getsale}
           stakeadrss={stakeadrss}
           f9token ={f9token}
           shibatoken ={shibatoken}

          />
        </TabPanel>  
        </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );

}
export default App;