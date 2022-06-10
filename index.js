const {
  Client,
  Collection,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  Intents
} = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.MESSAGE_CONTENT,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
});
module.exports = client;

client.login('BOT-TOKEN')
