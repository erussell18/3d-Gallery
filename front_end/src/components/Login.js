/* Component for the Login Page */
import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DBox from "./3D_Background/Login3D";
import LoginLogo from './HomePage/LoginLogoTwo.png';


function Login() {
    let navigate = useNavigate()
    const [currentAccount, setCurrentAccount] = useState(null)

    const checkWalletIsConnected = async() => {
        const {ethereum} = window;

        if(!ethereum) {
            console.log("Make sure you have Metamask installed!")
            return;
        }
        else{
            console.log('Wallet exists! We are ready to go')
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length !==0) {
            const account = accounts[0];
            console.log('Found an authorized account: ', account);
            setCurrentAccount(account);
        } 
        else{
            console.log("No authorized account found");
        }
     }

    const connectWalletHandler = () => {
        const {ethereum} = window;

        if(!ethereum) {
            alert("Please Install Metamask");
        }
        try {
            const accounts = /*await*/ ethereum.request({method: 'eth_requestAccounts'});
            console.log('Found an account! Address: ',accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (err){
            
            console.log(err)
        }
     }


  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler}>
        Connect Account
      </button>
    )
  }

  const mintNftButton = () => {
    return navigate('/Home')
  }

  useEffect(() => { // If the Account is changed the page will refresh
    const {ethereum} = window;
    if (ethereum){
      window.ethereum.on('accountsChanged', () => {
      window.location.reload();
      })
  }
  })

  useEffect(() => {
    checkWalletIsConnected();
  }, [])


    return(
        <body>
            <DBox /> {/*Imported 3D Component*/} 

            <section id="Login">
                <article id="Login_Logo"> <img src={LoginLogo} /></article>

                <article id="Login_Info">
                    
                    {currentAccount ? mintNftButton() :connectWalletButton()}
                    
                    
                </article>
            </section>
        </body>
    )
}

export default Login;