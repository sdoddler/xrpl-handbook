async function sendXRP(client, amount, fromSeed, destinationAddress) {
    var fromWallet = xrpl.Wallet.fromSeed(fromSeed);

    const issue_quantity = amount;
    const send_token_tx = {
        "TransactionType": "Payment",
        "Account": fromWallet.address,
        "Amount": xrpl.xrpToDrops(amount),
        "Destination": destinationAddress,
        //"DestinationTag": 1111111 -- Can be enabled as required
    }
    
    // autofill details such as the current network Fee
    const pay_prepared = await client.autofill(send_token_tx)
    
    // sign from the wallet
    const pay_signed = fromWallet.sign(pay_prepared)
    console.log(`Sending ${issue_quantity} XRP to ${destinationAddress}...`)
    const pay_result = await client.submitAndWait(pay_signed.tx_blob)
    
    if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
        //Print the transaction hash
        console.log(`Transaction succeeded: ${pay_signed.hash}`);
    } else {
        //Print any errors that occured sending the transaction
        console.log(`Error sending transaction: ${pay_result.result.meta.TransactionResult}`);
    }
}


sendXRP(xrpClient, 10, "sEdVJBBrca71rovpRn1LqCZDoEDTfPe", "r4VjUgJt7HdeX3jYp8BCqmSbMkamncwcCV")
