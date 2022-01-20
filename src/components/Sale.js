import React, {useState} from "react"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import web3 from '../web3';
import Button from '@mui/material/Button';

export default function Sale(props){

    const [amount,setAmount] = useState('');

const inputChangeHandler = (event) => {
  event.preventDefault();
  setAmount(event.target.value);
  props.inputHandler(event.target.value);
};

const Approve = (Transition) => async() =>{
  const accounts = await web3.eth.getAccounts();
  const contractadrss = '0x413B10177a29E5D85c86A516d9E6254D265Dc5Ee'
  //await Token.methods.approve(contractadrss,totalSupply).send({from:accounts[0]})
  
}


  return (
    
    <React.Fragment>
      
      <Box sx={{ flexGrow: 1, borderRadius:'20px',padding:'25px 0 25px 0'}} >
      <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="#fff"
              gutterBottom
              fontWeight="200"
              marginBottom='30px'
            >
            Sale
            </Typography>
           
        <FormControl fullWidth sx={{ m: 1 }}>
          <p style={{color:'#fff'}}>ETH</p>
          <OutlinedInput  sx={{color:'#fff',bgcolor:'#fff',height:'2.5em',mb:2}} value={amount} onChange = {inputChangeHandler} />
          </FormControl> 
          <FormControl fullWidth sx={{ m: 1 }}>
         <p style={{color:'#fff'}}>Token</p>
          <OutlinedInput   sx={{color:'#fff',bgcolor:'#fff',height:'2.5em'}} value={amount} onChange = {inputChangeHandler} />
          </FormControl> 

          <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => {props.Stake()}} sx={{borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>Swap</Button>
             
              </Stack>

           
          </Container>
  
      </Box>
    </React.Fragment>
  );
    

}