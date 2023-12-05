async function sendXRP(client, amount, fromSeed, destinationAddress, destinationTag = 0, memo = "") {
    var fromWallet = xrpl.Wallet.fromSeed(fromSeed);

    const issue_quantity = amount;
    const send_xrp_tx= {
        "TransactionType": "Payment",
        "Account": fromWallet.address,
        "Amount": xrpl.xrpToDrops(amount),
        "Destination": destinationAddress,
    }

    if (destinationTag > 0){
        send_xrp_tx.DestinationTag = destinationTag;
    }
    
    if (memo != "") {
       var memohex = xrpl.convertStringToHex(memo)
        send_xrp_tx.Memos =  [
            {
                "Memo": {
                    "MemoData": memohex
                }
            }
        ]
    }
    
    // autofill details such as the current network Fee
    const pay_prepared = await client.autofill(send_xrp_tx)
    
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
