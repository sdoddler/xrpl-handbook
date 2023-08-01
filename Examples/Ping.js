async function ping(client){
 var response = await client.request({
    "id": 1,
    "command": "ping"
});

  console.log(response);
}

ping(xrpClient);
