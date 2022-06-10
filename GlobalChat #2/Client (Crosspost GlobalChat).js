const client = require('../index.js') //import client from index file

client.on('messageCreate', m => {
  if (m.author.bot) return;
  
  // Message Attachment
  let url = ""
  m.attachments.forEach(a => {
        url = a.attachment
  });
  
  const channel1 = client.channels.cache.get('CHANNEL_ID1')
  const channel2 = client.channels.cache.get('CHANNEL_ID2')
  
  // if no detection of message attachment
  if (url === ''){
      if (m.channel.id === channel1.id) return channel2.send(`${m.author.tag}: \n>>> ${m.content}`) 
      if (m.channel.id === channel2.id) return channel1.send(`${m.author.tag}: \n>>> ${m.content}`)
      // channel 1 message send to channel 2
      // channel 2 message send to channel 1
  } else {
    // if got detection of message attachment
    if (m.channel.id === channel1.id) return channel2.send({ content: `${m.author.tag}: \n>>> ${m.content}`, files: [url] })
    if (m.channel.id === channel2.id) return channel1.send({ content: `${m.author.tag}: \n>>> ${m.content}`, files: [url] })
    // channel 1 message send to channel 2
    // channel 2 message send to channel 1
  }
})
