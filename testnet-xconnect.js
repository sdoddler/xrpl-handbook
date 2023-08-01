async function xconnect(xrpNode) {
    if (typeof xrpClient !== 'undefined' && xrpClient !== null) {
      if (xrpClient.url == xrpNode){
      	if (xrpClient.isConnected()) return; 
      }
    }
  xrpClient = new xrpl.Client(xrpNode)
  console.log('connecting to **XRPL** ' + xrpNode);
    

    await xrpClient.connect()
                
}
/* -- Alternative Servers --
These are public servers, if you are creating your own project, it is recommended you spin up your own 

*/

xconnect('wss://testnet.xrpl-labs.com/');
