import React, {useState,useEffect} from "react"
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Title from './Title';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import web3 from '../web3';
import Staking from '../Staking';
import Token from '../contracts/F9Token';
import Crowdsale from "../contracts/Crowdsale";
import Approve from "./Approve";
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { border } from "@mui/system";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import { CodeSharp, ContactSupportOutlined } from "@material-ui/icons";





const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${blue[500]} !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'blue !important',
  },
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Register() {

const classes = styles();
const [account, setAccount] = useState('Connecting to Metamask..');
const [amount,setAmount] = useState('');
const [approve,setApprove] = useState('');
const [walletbalance,setWalletBalance] = useState('');
const [allowance,SetAllowance] = useState('');
const [stakedbalance,setStakedBalance] = useState('');
const [unlocktime, setUnlockTime] = useState('');
const [totalSupply,setTotalSupply] = useState('');
const [open, setOpen] = React.useState(false);
const [openapprove, setOpenApprove] = React.useState(true);
const [transition, setTransition] = React.useState(undefined);
const token ='0x0328f9D71eabF1594ebD15Ed07a02F388621dA46'



useEffect(() => {
  const init = async () => {
    
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const stakeadrss = '0x413B10177a29E5D85c86A516d9E6254D265Dc5Ee'
    const stakebalance = await Staking.methods.stakedBalance(token,accounts[0]).call()
    const unlocktime = await Staking.methods.unlockTime(accounts[0]).call()
    const Allowance  =  await Token.methods.allowance(accounts[0],stakeadrss).call()
    const supply = await Token.methods.totalSupply().call()
    setWalletBalance(balance);
    setStakedBalance(stakebalance);
    setUnlockTime(unlocktime);
    SetAllowance(Allowance);
    setTotalSupply(supply);
  
  };
  init();
}, []);

const Ido = () => async() =>{
  const accounts = await web3.eth.getAccounts();
 // const token = '0x413B10177a29E5D85c86A516d9E6254D265Dc5Ee'
  await Crowdsale.methods.registerIDO(token).send({from:accounts[0]})
  
}

console.log(allowance);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  return (
    
    <React.Fragment>
      

      <Box sx={{ flexGrow: 1, borderRadius:'20px',padding:'25px 0 25px 0',m:6}} >
      <Container maxWidth="md">
      <Typography
              component="h4"
              variant="h4"
              align="center"
              color="#fff"
              gutterBottom
              fontWeight="900"
            >
              Register IDO
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
             
              <Button variant="contained" onClick={Ido()} sx={{borderRadius:'10px', padding:'10px 50px 10px 50px', bgcolor:'transparent', border:'1px solid #fff'}}>Register F9 IDO</Button>
              <Button variant="contained" onClick={Ido()} sx={{borderRadius:'10px', padding:'10px 50px 10px 50px', bgcolor:'transparent', border:'1px solid #fff'}}>Register Shiba IDO</Button>

              <Snackbar
                    open={open}
                    TransitionComponent={transition}
                    //message="Enter a Valid Number"
                    key={transition ? transition.name : ''}
                  >
                  <Alert severity="error">Enter a Valid Number</Alert>

                    </Snackbar>
            </Stack>
        </FormControl>
      
      </Container>
      </Box>
    
    </React.Fragment>
  );
}
