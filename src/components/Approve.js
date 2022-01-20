import React, {useState,useEffect} from "react"
import Modal from '@mui/material/Modal';
import web3 from '../web3';
import Token from '../contracts/F9Token';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';



export default function Approve(props){

    const [allowance,SetAllowance] = useState('');
    const [open, setOpen] = useState(true);
    const [totalSupply,setTotalSupply] = useState('');
    const [disable, setDisable] = React.useState(false);



    const Approve = (Transition) => async() =>{
        const accounts = await web3.eth.getAccounts();
        const contractadrss = '0x370C34a4C235e8c322948290eB54dA6c3D4615D7'
  
        
        await Token.methods.approve(contractadrss,totalSupply).send({from:accounts[0]}).on('confirmation', (confirmationNumber, receipt) => {
          <Modal onClose={handleClose()}/>
        });
        
      }

      const handleClose = () => {
        setOpen(false);
      };

      useEffect(()=>{
        const allow = async() =>{

            const accounts = await web3.eth.getAccounts();
            const stakeadrss = '0x370C34a4C235e8c322948290eB54dA6c3D4615D7'
            const Allowance  =  await Token.methods.allowance(accounts[0],stakeadrss).call()
            const supply = await Token.methods.totalSupply().call()

            SetAllowance(Allowance);
            setTotalSupply(supply);

        };
        allow();
    },[])

    console.log(allowance)

    return(
      <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >

      {allowance === '0'? 
          
          <Button variant="contained" onClick={() => {props.Stake()}} sx={{borderRadius:'10px', padding:'10px 50px 10px 50px', bgcolor:'transparent', border:'1px solid #fff'}}>
           <img src={`https://ibnz-staking.netlify.app/static/media/stake.e8708439.png`} alt="stake icon" className="stakeIcon"/>
           Approve
           </Button>
       /*
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
  border: '2px solid #000',
  borderRadius:'10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,}} >
    <Container maxWidth="md">
    <Typography
            component="h4"
            variant="h4"
            align="center"
            color="#6583fb"
            gutterBottom
            fontWeight="900"
          >
            Approval
          </Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={Approve()} sx={{borderRadius:'100px', padding:'10px 50px 10px 50px', bgcolor:'#6583fb'}}>Approve Tokens</Button>
            
          </Stack>
      </FormControl>
    
    </Container>
    </Box>
    </Modal>*/:console.log("nn")}
</Stack>
    )
}
