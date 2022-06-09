const client = require('../index.js')
client.on('messageCreate', m => {
  if (m.author.bot) return;
  let url = ""
  m.attachments.forEach(a => {
        url = a.attachment
  });
  const channel1 = client.channels.cache.get('984487882477674566')
  const channel2 = client.channels.cache.get('984487905579900938')

  if (url === ''){
      if (m.channel.id === channel1.id) return channel2.send(`${m.author.tag}: \n>>> ${m.content}`)
      if (m.channel.id === channel2.id) return channel1.send(`${m.author.tag}: \n>>> ${m.content}`)
  } else {
    if (m.channel.id === channel1.id) return channel2.send({ content: `${m.author.tag}: \n>>> ${m.content}`, files: [url] })
    if (m.channel.id === channel2.id) return channel1.send({ content: `${m.author.tag}: \n>>> ${m.content}`, files: [url] })
  }
})
