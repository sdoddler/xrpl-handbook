async function createTrustLine(client, amount, currency, issuerAddress, walletSeed, memo ="") {
    // Trusting Wallet
    var fromWallet = xrpl.Wallet.fromSeed(walletSeed);

// hex encode for anything that isn't 3 Characters in length.
var formattedCurrency = currency;
if (currency.length != 3) formattedCurrency = xrpl.convertStringToHex(currency).padEnd(40,'0');;


    // Default setting is to SetNoRipple in most circumstances - flags can have different effects read about them via xrpl.org
    const trust_set_tx = {
        "TransactionType": "TrustSet",
        "Account": fromWallet.address,
        "LimitAmount": {
            "currency": formattedCurrency,
            "issuer": issuerAddress,
            "value": amount 
        },
        "Flags": xrpl.TrustSetFlags.tfSetNoRipple,
    }

    
    if (memo != "") {
       var memohex = xrpl.convertStringToHex(memo)
        trust_set_tx.Memos =  [
            {
                "Memo": {
                    "MemoData": memohex
                }
            }
        ]
    }

  
    const ts_prepared = await client.autofill(trust_set_tx)
    const ts_signed = fromWallet.sign(ts_prepared)
    console.log(`Creating trust line for ${currency} from ${fromWallet.address} to ${issuerAddress}...`)
    const ts_result = await client.submitAndWait(ts_signed.tx_blob)
    if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: ${ts_signed.hash}`)
    } else {
        console.log(`Error sending transaction: ${ts_result.result.meta.TransactionResult}`);
    }
}

// Amount formatted as String
createTrustLine(xrpClient, "1337", "YAY", "r4VjUgJt7HdeX3jYp8BCqmSbMkamncwcCV", "sEdVJBBrca71rovpRn1LqCZDoEDTfPe");
