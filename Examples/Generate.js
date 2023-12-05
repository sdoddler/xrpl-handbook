async function generateAndFundWallet(client){
    var wallet = xrpl.Wallet.generate();
    console.log(wallet);
    
    
    
    // Assuming we have already declared our XRP Client
    var fundResult = await client.fundWallet(wallet);
    
    console.log(fundResult);
}

//As with most examples, we will use the "xrpClient" defined in the xconnect function
generateAndFundWallet(xrpClient);
