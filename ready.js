const client = require('../index'); // import client from index file

client.once('ready', () => {
  console.log(`Get set, Ready go! --- ${client.user.tag}`);
  
  client.user.setActivity("Global Chat", {
      type: "PLAYING",
  });
})
