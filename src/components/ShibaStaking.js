import React, {useState,useEffect} from "react"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import web3 from '../web3';
import ShibaToken from "../contracts/ShibaToken";
import Staking from "../Staking";
import Crowdsale from "../contracts/Crowdsale";
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';




export default function Shiba(props) {

const [allowance,SetAllowance] = useState('');
const [totalSupply,setTotalSupply] = useState('');
const [disable, setDisable] = React.useState(true);
const [issshibastaked,setIsShibaStaked] = useState('');
const [isf9staked,setIsF9Staked] = useState('');
const [f9disable, setF9Disable] = React.useState(true);
const [shibadisable, setShibaDisable] = React.useState(true);
const [display,setDisplay] = useState('')
const [open, setOpen] = React.useState(true);
const [ethinput,SetEthInput] = useState('');
const [rate,setRate] = useState('');
const handleClose = () => setOpen(false);
const [mopen, setMOpen] = React.useState(true);
const [shibahalted,SetShibaHalted] = useState(true);
const [loader, setLoader] = useState(false);
const [hasclosed,setHasClosed] = useState('');
const stakeadrss = '0x793C4F373859d6889df78113C00Ed25f1BaAd236';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#fff',
  fontFamily:'Poppins',
  backgroundColor:'transparent',
  borderBottom:'1px solid #fff',
  marginBottom:'15px'
}));


const ApproveShiba = async() =>{
  //const accounts = await web3.eth.getAccounts();
  //const contractadrss = '0xd55d2f270267015360509918280acBcc8B40c359'  
  await ShibaToken.methods.approve(props.stakeadrss,totalSupply).send({from:props.account}).on('sending',function(){
    setLoader(true);

  }).on('error',function(){
    setLoader(false);
   }).on('confirmation', async() => {

    const Allowance  =  await ShibaToken.methods.allowance(props.account,props.stakeadrss).call()
    SetAllowance(Allowance);
    setDisplay('show');
    setDisable(false); 
    setLoader(false);

  });
}

const RegisterShibIDO = async() =>{

  // const accounts = await web3.eth.getAccounts();
  //const ShibToken = "0x2E6Aa2063342Ce10c3d23Ee3A17F9E72314d0010"
  // const token = '0x413B10177a29E5D85c86A516d9E6254D265Dc5Ee'
   await Crowdsale.methods.registerIDO(props.shibatoken).send({from:props.account})

}

useEffect(()=>{
  const allow = async() =>{

      const accounts = await web3.eth.getAccounts();
      const Allowance  =  await ShibaToken.methods.allowance(accounts[0],stakeadrss).call()
      const supply = await ShibaToken.methods.totalSupply().call()

      SetAllowance(Allowance);
      setTotalSupply(supply);
       
      if(Allowance === '0'){
        setDisable(true)
        setDisplay('none')
      }else{
        setDisable(false)
      }

      const shibastaked = await Staking.methods.isShibaStaked(accounts[0]).call();
      setIsShibaStaked(shibastaked)
      if(shibastaked === true || Allowance === '0'){
        setShibaDisable(true)
      }else{
        setShibaDisable(false)
      }

      const f9staked= await Staking.methods.isF9Staked(accounts[0]).call()
      setIsF9Staked(f9staked);
      if(f9staked === true || Allowance === '0' ){
        setF9Disable(true)
      }else{
        setF9Disable(false)

        const tokenrate = await Crowdsale.methods.rate().call();
        setRate(tokenrate);
      }

      const close = await Crowdsale.methods.hasClosed().call();
      setHasClosed(close);

      const halted = await Staking.methods.shibaHalted().call();
      SetShibaHalted(halted);

  };
  allow();
},[])

const inputHandler = (e) =>{

  e.preventDefault();
  SetEthInput(e.target.value);

}


const BuyTokens = async() =>{
 // const accounts = await web3.eth.getAccounts();
  await Crowdsale.methods.buyTokens(props.account).call();
}

const Withdraw = async() =>{
 // const accounts = await web3.eth.getAccounts();

  await Crowdsale.methods.withdrawTokens(props.account).call();
}


  return (

    <React.Fragment>
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
      
      <Box sx={{ flexGrow: 1, borderRadius:'20px',padding:'25px 0 25px 0'}} >
      <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="#fff"
              gutterBottom
              fontWeight="900"
              fontFamily="aAtmospheric"
            >
             Stake
            </Typography>
            <div style={{ width: '100%',align:'center' }}>
            <Box
                  sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    columnGap: 24,
                    width:'100%',
                    align:'center'
                  }}>
                   <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily="Poppins"
              letterSpacing='1px'>
            Wallet Balance:
            </Typography>   
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily="Poppins"
              letterSpacing='1px'
            >
           {web3.utils.fromWei(props.shibwalletbalance, 'ether')}
           
            </Typography>
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily="Poppins"
              letterSpacing='1px'
            >
              Staked Balance:
            </Typography>
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily="Poppins"
              letterSpacing='1px'
            >
              {props.shibastakedbalance}
            </Typography>
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              marginBottom='30px'
              fontFamily="Poppins"
              letterSpacing='1px'
            >
              Unlock Time:
            </Typography>
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily="Poppins"
              letterSpacing='1px'
            >
              {props.unlocktime}
            </Typography>
            </Box>
            </div>
        <FormControl fullWidth sx={{ m: 1 }}>
           
        <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              paddingBottom='32px'
            >
        
        {allowance === '0' ?       
        <Button variant="contained" onClick={ApproveShiba} sx={{fontFamily:'Poppins', borderRadius:'100px', padding:'10px 40px 10px 40px', bgcolor:'#6583fb'}}>
             Allow the F9 Protocol to use your Shiba Inu Tokens <Tooltip sx={{fontFamily:'Poppins',marginLeft:'5px'}} describeChild placement="top-start"
             title="You must give F9 Smart contracts permission to use your tokens.You only have to do this once per token">
              <HelpOutlineOutlinedIcon/></Tooltip>
           </Button>:null}
           </Stack>
           <Box  maxWidth="lg" sx={{flexGrow: 2}} >
           <Container  sx={{borderRadius:'20px'}}>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="#fff"
              gutterBottom
              fontWeight="bold"
              marginBottom='30px'
              fontFamily="aAtmospheric"
            >
          TIER LEVELS 

            </Typography>
            <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
        <Grid className="grid-item" item xs={6}>
          <Item><h3 style={{marginBottom:'0px'}}>SHIBA EXPLORER</h3>
            TBA<br/>
            Pool Weight: (1x)
          </Item>
        </Grid>
        <Grid className="grid-item" item xs={6}>
          <Item><h3 style={{marginBottom:'0px'}}>SHIBANAUT</h3>
          TBA<br/>
            Pool Weight: (5x)
          </Item>
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <Item><h3 style={{marginBottom:'0px'}}>SHIBA VOYAGER</h3>
          TBA <br/>
            Pool Weight: (10x)
          </Item>
        </Grid>
      </Grid>
    </Box>
        </Container>
      </Box>
          <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              display={display}
            >
              <Button className="shibstake" disabled = {f9disable || shibadisable || shibahalted} variant="contained" onClick={()=>{props.StakeT0()}} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 25px 10px 25px', bgcolor:'#6583fb'}}>Stake Low Tier </Button>
              <Button className="shibstake" disabled = {f9disable || shibadisable || shibahalted }  variant="contained" onClick={()=>{props.StakeT1()}} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 25px 10px 25px', bgcolor:'#6583fb'}}>Stake Mid Tier </Button>
              <Button className="shibstake" disabled = {f9disable || shibadisable || shibahalted} variant="contained" onClick={()=>{props.StakeT2()}} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 25px 10px 25px', bgcolor:'#6583fb'}}>Stake High Tier </Button>
         </Stack>
            
              <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              display={display}
            >
               <Button  disabled = {disable || shibahalted} variant="contained" onClick={()=>{props.UnStakeShiba()}} sx={{
                fontFamily:'Poppins',borderRadius:'100px',padding:'10px 25px 10px 25px', bgcolor:'#6583fb'}}>Unstake</Button>    
                         
              </Stack>
              <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              display={display}
            >
              {props.getsale === '0' || props.getsale === '1' || props.getsale === '3' ?
              <Button disabled variant="contained" onClick={RegisterShibIDO} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>Register </Button>
               : props.getsale === '2' ?
               <Button  variant="contained" onClick={RegisterShibIDO} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>Register </Button>
                :null
               }
              </Stack>
              {issshibastaked === true ?

                      <Modal
                      open={open}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      >
                          <Box sx={{ position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: '#0a2549',
                            border: '2px solid #fff',
                            borderRadius:'10px',
                            boxShadow: 24,
                            pt: 2,
                            px: 4,
                            pb: 3,}} >
                              <Container maxWidth="md">
                              <Typography
                                      component="p"
                                      variant="p"
                                      align="center"
                                      color="#fff"
                                      fontWeight="bold"
                                      fontFamily="Poppins"
                                    >
                                      You Have Staked in Shiba Pool. You are not Eligible to stake.
                                    <Button  onClick={handleClose} variant="contained"  sx={{
                       fontFamily:'Poppins', borderRadius:'100px',padding:'10px 40px 10px 40px', bgcolor:'#6583fb',mt:'20px'}}>Close</Button>  

                                    </Typography>
                                    
                      </Container>
                      </Box>
                        
                      </Modal>
                 
                    :shibahalted === true ?
                                      
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <Box className="notification" sx={{ position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 400,
                          bgcolor: '#0a2549',
                          border: '2px solid #fff',
                          borderRadius:'10px',
                          boxShadow: 24,
                          pt: 2,
                          px: 4,
                          pb: 3,}} >
                            <Container maxWidth="md">
                            <Typography
                                    component="p"
                                    variant="p"
                                    align="center"
                                    color="#fff"
                                    fontWeight="bold"
                                    fontFamily="Poppins"
                                  >
                                    Shiba Inu staking is halted at the moment.
                                  </Typography>
                                  
                    </Container>
                    </Box>
                      
                    </Modal>:null}
                  
                 
             {isf9staked === true ?
             <Modal
             open={open}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
             onClose={handleClose}
             
             >
                  <Box className ="notification" sx={{ position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#0a2549',
                    border: '2px solid #fff',
                    borderRadius:'10px',
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,}} >
                      <Container maxWidth="md">
                      <Typography
                              component="p"
                              variant="p"
                              align="center"
                              color="#fff"
                              fontWeight="bold"
                              fontFamily="Poppins"
                            >
                           You are currently staked in the F9 Pool. You are not eligible to stake Shiba Inu at this time.
                            </Typography>   
          </Container>
          </Box>
           </Modal>
                   :null}
        </FormControl> 
          </Container>
      </Box>
      <Box   sx={{flexGrow: 1, borderRadius:'20px',padding:'25px 0 25px 0'}} >
      <Container className="sale-container" maxWidth="xs" sx={{borderRadius:'20px',padding:'25px 0 25px 0',border:'1px solid #fff'}}>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="#fff"
              gutterBottom
              fontWeight="bold"
              marginBottom='30px'
              fontFamily="aAtmospheric"
            >
            Sale
            </Typography>
        <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount"  sx={{fontFamily:'Poppins',color:'#fff',fontWeight:'bold',transform:'translate(14px, -9px) scale(0.75)'}}>ETH</InputLabel>
        <OutlinedInput 
        type="number"  
        placeholder="0.00"
         sx={{fontFamily:'Poppins',color:'#000',bgcolor:'#fff',borderRadius:'10px',height:'2.5em',m:1}} value={ethinput} onChange={inputHandler}  />
        </FormControl> 
        <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount" sx={{fontFamily:'Poppins',color:'#fff',fontWeight:'bold'}}>Token</InputLabel>
        <OutlinedInput readOnly  placeholder="0.00" sx={{fontFamily:'Poppins',color:'#000',bgcolor:'#fff',borderRadius:'10px',height:'2.5em',m:1}} value={ethinput * rate}
        />
        </FormControl> 
          <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                {props.getsale === '1' || props.getsale === '2' ?
              <Button disabled variant="contained" onClick={BuyTokens} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>Buy Tokens</Button>
              :props.getsale === '3' ?
              <Button variant="contained" onClick={BuyTokens} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>Buy Tokens</Button>
              :      
              <Button variant="contained" onClick={BuyTokens} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>Buy Tokens</Button>
            }
              </Stack>
          </Container>
      </Box>                    
      <Box   sx={{flexGrow: 1, borderRadius:'20px',padding:'25px 0 25px 0'}} >
      <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          {hasclosed === true ?
          <Button 
          variant="contained" 
          onClick={Withdraw} 
          sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'20px 100px 20px 100px', bgcolor:'#6583fb'}}>Claim</Button>
          :  
          <Button 
          disabled
          variant="contained" 
          sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'20px 100px 20px 100px', bgcolor:'#6583fb'}}>Claim</Button>
          }
          </Stack>
  </Box>
    </React.Fragment>
  );
}
