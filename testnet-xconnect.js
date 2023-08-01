async function xconnect(xrpNode) {
    //If xrpClient is already defined
    if (typeof xrpClient !== 'undefined' && xrpClient !== null) {
        // and xrpClient is set to the node we want to connect to
      if (xrpClient.url == xrpNode){
          // If it's already connected - return/skip
      	if (xrpClient.isConnected()) return;

          // this check is handy if you want to put "xconnect();" in specific calls to ensure the client is connected.
          // it can also handle/be useful if you are experiencing disconnects.
      }
    }
    // Set as new client
  xrpClient = new xrpl.Client(xrpNode)
  console.log('connecting to **XRPL** ' + xrpNode);
    
    // wait for connection
    await xrpClient.connect()
                
}


/* -- Alternative Servers --
These are public servers, if you are creating your own project, it is recommended you spin up your own submission node
More info: https://xrpl.org/public-servers.html
-- TESTNET --
Ripple Testnet -        wss://s.altnet.rippletest.net:51233/
XRPL Labs Testnet -     wss://testnet.xrpl-labs.com/
Ripple	Devnet -        wss://s.devnet.rippletest.net:51233/
Ripple	AMM-Devnet -    wss://amm.devnet.rippletest.net:51233/	
-- LIVENET --
XRP Ledger Foundation	wss://xrplcluster.com/
                        wss://xrpl.ws/
                        
Ripple                  wss://s1.ripple.com/
Ripple                  wss://s2.ripple.com/
*/

xconnect('wss://testnet.xrpl-labs.com/');
