import React, {useState,useEffect, useCallback} from "react"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import web3 from '../web3';
import F9Token from '../contracts/F9Token';
import Staking from "../Staking";
import Crowdsale from "../contracts/Crowdsale";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



export default function F9Staking(props) {

const [amount,setAmount] = useState('');
const [allowance,SetAllowance] = useState('');
const [totalSupply,setTotalSupply] = useState('');
const [disable, setDisable] = React.useState(true);
const [issshibastaked,setIsShibaStaked] = useState('');
const [display,setDisplay] = useState('');
const [open, setOpen] = React.useState(true);
const [rate,setRate] = useState('');
const [ethinput,SetEthInput] = useState('');
const [mopen, setMOpen] = React.useState(true);
const [loader, setLoader] = useState(false);
const [hasclosed,setHasClosed] = useState('');
const [f9halted,setF9Halted] = useState(false);
const handleClose = () => setOpen(false);
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

const inputChangeHandler = (event) => {
  event.preventDefault();
  setAmount(event.target.value);
  props.inputHandler(event.target.value);
};

const ApproveF9 = async() =>{
 // const contractadrss = '0xd55d2f270267015360509918280acBcc8B40c359'  
  await F9Token.methods.approve(props.stakeadrss,totalSupply).send({from:props.account}).on('sending',function(){
    setLoader(true);
  }).on('error',function(){
    setLoader(false);
   }).on('confirmation', async() => {
    const Allowance  =  await F9Token.methods.allowance(props.account,props.stakeadrss).call();
    SetAllowance(Allowance);
    setDisplay('show');
    setDisable(false); 
    setLoader(false);
  });
  
}

const RegisterF9IDO = async() =>{

 // const accounts = await web3.eth.getAccounts();
 // const F9Token = "0x5273AAa06A99511fc5Dc0223C4E8BF7a64862d1a"
  // const token = '0x413B10177a29E5D85c86A516d9E6254D265Dc5Ee'
   await Crowdsale.methods.registerIDO(props.f9token).send({from:props.account})
   
}

const BuyTokens = async() =>{
 //  const accounts = await web3.eth.getAccounts();
   await Crowdsale.methods.buyTokens(props.account).call();
}

const Withdraw = async() =>{
//  const accounts = await web3.eth.getAccounts();

  await Crowdsale.methods.withdrawTokens(props.account).call();
}

const inputHandler = (e) =>{

  e.preventDefault();
  SetEthInput(e.target.value);

}

useEffect(()=>{
  const allow = async() =>{

      const accounts = await web3.eth.getAccounts();
      const Allowance  =  await F9Token.methods.allowance(accounts[0],stakeadrss).call();
      const supply = await F9Token.methods.totalSupply().call()
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
        setDisable(true)
      }else{
        setDisable(false)
      }

      const tokenrate = await Crowdsale.methods.rate().call();
      setRate(tokenrate);

      const Evt = Crowdsale.events.Registered();
      console.log(Evt)

      const tokenevnt = await Crowdsale.events.TokensPurchased();
      console.log(tokenevnt);

      const close = await Crowdsale.methods.hasClosed().call();
      setHasClosed(close);

      const halted = Staking.methods.f9Halted().call();
      setF9Halted(halted);

  };
  allow();
},[])

  return (
    <React.Fragment>
        {loader? 
        <Modal
        open={mopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box className="notification" sx={{ position: 'absolute',
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
      <Box sx={{ flexGrow: 1, borderRadius:'20px',padding:'25px 0 25px 0',marginBottom:'50px'}} >
      <Container maxWidth="sm">
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
                  }}
                >
                   <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
            fontFamily ='Poppins'
            letterSpacing='1px'
            >
            Wallet Balance:
            </Typography>   
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily ='Poppins'
              letterSpacing='1px'
            >
              
           {props.walletbalance}

            </Typography>
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily ='Poppins'
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
              fontFamily ='Poppins'
              letterSpacing='1px'
            >
              {props.f9stakedbalance}
            </Typography>
            <Typography
              component="p"
              variant="p"
              align="center"
              color="#fff"
              gutterBottom
              fontFamily ='Poppins'
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
              fontFamily ='Poppins'
              letterSpacing='1px'
            >
              {props.unlocktime}
            </Typography>
            </Box>
            </div>
        <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput type="number"  placeholder="stake amount" sx={{color:'#000',bgcolor:'#fff',borderRadius:'10px',height:'2.5em',fontFamily:'Poppins',marginBottom:'30px'}} value={amount} onChange = {inputChangeHandler} />
          <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              fontFamily ='Poppins'
              paddingBottom='32px'
            >
           {allowance === '0' ? 
          <Button variant="contained"  onClick={ApproveF9} sx={{fontFamily:'Poppins', borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>
           Allow the F9 Protocol to use your F9 Tokens<Tooltip sx={{marginLeft:'5px'}} describeChild placement="top-start"
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
          <Item><h3 style={{marginBottom:'0px'}}>TERRAN PLEB</h3>
            9,999 F9<br/>
            Pool Weight: (1x)
          </Item>
        </Grid>
        <Grid className="grid-item" item xs={6}>
          <Item><h3 style={{marginBottom:'0px'}}>MOONBOYOSHI</h3>
            99,999 F9<br/>
            Pool Weight: (10x)
          </Item>
        </Grid>
        <Grid className="grid-item" item xs={6}>
          <Item><h3 style={{marginBottom:'0px'}}>MARTIAN WOJAK</h3>
            499,999 F9<br/>
            Pool Weight: (50x)
          </Item>
        </Grid>
        <Grid className="grid-item" item xs={6}>
          <Item><h3 style={{marginBottom:'0px'}}>GALACTIC CHAD</h3>
            999,999 F9<br/>
            Pool Weight: (100x)
          </Item>
        </Grid>
        <Grid className="grid-item" item xs={12}>
          <Item><h3 style={{marginBottom:'0px'}}>STARLORD "V.C"</h3>
            4,206,969 F9<br/>
            Pool Weight: (420x)
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
              fontFamily ='Poppins'
            >
              <Button disabled={disable && f9halted}  variant="contained" onClick={() => {props.Stake()}} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>
                Stake
              </Button>
              <Button disabled={disable && f9halted}  variant="contained" onClick={() => {props.UnStake()}} sx={{fontFamily:'Poppins',borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>
                Unstake</Button>
                </Stack>
                <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              display={display}
              fontFamily ='Poppins'
               >
                {(props.getsale === '0' || props.getsale === '2' || props.getsale ==='3') ?
                <Button disabled
                 variant="contained" 
                 onClick={RegisterF9IDO} 
                 sx={{fontFamily:'Poppins', borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>
                 Register
                </Button> :
                 props.getsale === '1'?
                 <Button 
                 variant="contained" 
                 onClick={RegisterF9IDO} 
                 sx={{fontFamily:'Poppins', borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>
                 Register
                </Button>:null
                  }
                </Stack>
                  {issshibastaked === true ?
                    <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={handleClose}
                    >
                        <Box  className="notification" sx={{ position: 'absolute',
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
                                    fontFamily ='Poppins'
                                  >
                                    You are currently staked in the Shiba Inu 
                                    Pool.You are not eligible to stake F9 at this time.
                                  </Typography>
                    </Container>
                    </Box>
                    </Modal>
                    :f9halted === true ?
                    <Modal
                    open={open}
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
                                    F9 Staking is Halted at the Moment.<br/>
                                  <Button  onClick={handleClose} variant="contained"  sx={{
                     fontFamily:'Poppins', borderRadius:'100px',padding:'10px 40px 10px 40px', bgcolor:'#6583fb',mt:'20px'}}>Close</Button>  

                                  </Typography>
                                  
                    </Container>
                    </Box>
                      
                    </Modal>:null}
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
