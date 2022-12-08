import React,{ useState } from 'react';
import Web3 from 'web3';
import './App.css';


function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [balance,setBalance] = useState("")

  const detectCurrentProvider = () =>{
    let provider;
    if(window.ethereum){
      provider = window.ethereum;
      console.log("if: ", provider)
    }
    else if(window.web3){
      provider = window.web3.currentProvider;
      console.log("else: ",provider)
    }
    else{
      console.log("Non")
    }
    return provider;
  };

  const eventHandler = async() =>{
      try {
        
        const currentProvider = detectCurrentProvider();
        if(currentProvider){
          await currentProvider.request({method: 'eth_requestAccounts'});
          const web3 = new Web3(currentProvider);
          const userAccount = await web3.eth.getAccounts();
          const account = userAccount[0]
          let ethBalance = await web3.eth.getBalance(account);
          setBalance(ethBalance)
          setIsConnected(true);
        }
      } 
      catch (error) {
        console.log(error)
      }

  }

  const onDisconnect = () =>{
    setIsConnected(false)
  }


  return (
    <div className="app">
     <div className='app-header'>
      <h1>React app</h1>
     </div>
     <div className='app-wrapper'>
        {
         !isConnected && (
          <div>
            <button className='app-button_login' onClick={eventHandler}> Login</button>
          </div>
         ) 
        }
     </div>
     {
      isConnected && (
        <div className='app-wrapper'>
          <div className='app-details'>
            <h2>You are connected to metamask</h2>
            <div>
              <span>Balance: </span>
              {balance}
            </div>
          </div>
          <div>
            <button className='app-buttons_logout' onClick={onDisconnect}>Disconnect</button>
          </div>
        </div>
      )
     }
    </div>
  );
}

export default App;
