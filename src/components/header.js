/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

let Web3 = require('web3');

function Header(){

    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)

   
    useEffect(() => {
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
     
     
  const CheckConnection = () => {
           if(web3 !== null){
            return(<span>{address.substring(0, 10)}</span>)
           }
           
           else{

            return('not connected')

           }
           
         }

    return(
        <header className="header">
            <div className="header-announcement-bar-wrapper">
                <div className="header-inner container--fluid">
                    <div className="header-display-desktop">
                    <div className="header-title-nav-wrapper">
                    <div className="header-title preSlide slideIn">
                    <div className="header-title-logo">
                        <a href="https://www.f9launch.com/" className="preSlide slideIn">
                        <img src="//images.squarespace-cdn.com/content/v1/60fa08eab75c75498c2a849e/575eaf55-670e-47e6-bb4b-05a312ad4d23/F9+Logo+%2B+Text+.png?format=1500w" alt="falcon-9"/> 
                        </a>
                    </div>
                    </div>
                   
                    <div className="header-nav">
                        <div className="header-nav-wrapper">
                            <nav className="header-nav-list">
                                <div className="header-nav-item">
                                    <a href="/">
                                        Home
                                     </a>
                                </div>
                                <div className="header-nav-item">
                                    <a href="/">
                                        Chart
                                     </a>
                                </div>
                                <div className="header-nav-item">
                                    <a href="/">
                                        Telegram
                                     </a>
                                </div>
                                <div className="header-nav-item">
                                    <a href="/">
                                        Spacepaper
                                     </a>
                                </div>
                             </nav>
                        </div>
                    </div>
                    <div className="header-actions header-actions--right">
                     <div className="header-actions-action">
                          <a target="_blank"  className="btn btn--border theme-btn--primary-inverse">
                             <CheckConnection/>
                        </a>
                     </div>
                    </div>
                     </div>
                     </div>
                </div>
            </div>
        </header>
        
    )
}

export default Header