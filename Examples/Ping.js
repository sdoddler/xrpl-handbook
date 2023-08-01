async function ping(client){
 var response = await client.request({
    "id": 1,
    "command": "ping"
});

  console.log(response);
}

//As with most examples, we will use the "xrpClient" defined in the xconnect function
ping(xrpClient);
