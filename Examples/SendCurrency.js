async function SendCurrency(client, amount, currencyCode, issueAddress, fromSeed, destinationAddress, destinationTag = 0,memo = "") {
    var fromWallet = xrpl.Wallet.fromSeed(fromSeed);

    // hex encode for anything that isn't 3 Characters in length.
    var formattedCurrency = currencyCode;
    if (currency.length != 3) formattedCurrency = xrpl.convertStringToHex(currencyCode).padEnd(40,'0');
    
    const send_token_tx = {
        "TransactionType": "Payment",
        "Account": fromWallet.address,
        "Amount": {
            "currency": formattedCurrency,
            "value": amount,
            "issuer": issueAddress
        },
        "Destination": destinationAddress
    }

    if (destinationTag > 0){
        send_token_tx.DestinationTag = destinationTag;
    }

    if (memo != "") {
       var memohex = xrpl.convertStringToHex(memo)
        send_token_tx.Memos =  [
            {
                "Memo": {
                    "MemoData": memohex
                }
            }
        ]
    }

    const pay_prepared = await client.autofill(send_token_tx)
    const pay_signed = fromWallet.sign(pay_prepared)
    try {
        console.log(`Sending ${amount} ${currencyCode} to ${destinationAddress}...`)
        const pay_result = await client.submitAndWait(pay_signed.tx_blob);
        if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
            console.log(`Transaction succeeded: ${pay_signed.hash}`)
        } else {
            console.log(`Error sending transaction: ${pay_result.result.meta.TransactionResult}`)
        }
    }
    catch (error) {
        console.log(error)
    }
}

SendCurrency(xrpClient, "10", "YAY", "rPXitnxxR7qYvp1gXjbCTAQqL88LVYqUwi", "sEdTpKYQasMAfndVFmeQqJASQRppcmK", "rLutZfbcEM73iYXYzn1zTyiH5JtcmDEXaw", 111,memo = "Testing From Code Playground")
