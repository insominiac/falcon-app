import { useCallback, useEffect, useRef, useState } from 'react';
import Web3 from '../web3'
import Staking from '../Staking';

//const provider = new ethers.providers.Web3Provider(fm.getProvider());


export default function Token(){
    
    const [f9stakedbalance,setF9StakedBalance] = useState(0);
    const prevBalanceRef = useRef(0);

    const f9token ='0xbA6aa471862F300003147dE2682520Dc96a0a349'


    const fetchBalance = useCallback(async () => {

        const ethereum = window.ethereum;
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(ethereum);
  
      //connecting to metamask
      let web3 = window.web3;
      const accounts = await web3.eth.getAccounts()
        const address = accounts[0]
        console.log(address);
    
        const stakebalance = await Staking.methods.stakedBalance(f9token,accounts[0]).call()
        
        if (stakebalance !== prevBalanceRef.current) {
            prevBalanceRef.current = stakebalance;
            setF9StakedBalance(stakebalance);
          }
    
        // Optimization: check that user balance has actually changed before
        // updating state and triggering the consuming component re-render
       
      }, []);
    
      useEffect(() => {
        fetchBalance();
      }, [fetchBalance]);

      useEffect(() => {
        // Fetch user balance on each block
      //  provider.on('block', fetchBalance);
    
        // Cleanup function is used to unsubscribe from 'block' event and prevent
        // a possible memory leak in your application.
        return () => {
         //   provider.off('block', fetchBalance);
        };
      }, [fetchBalance]);

      return f9stakedbalance;
}