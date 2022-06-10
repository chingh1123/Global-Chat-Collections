const Discord = require("discord.js");
const client = require('../index')
const globalChannels = [
    "CHANNEL_ID1",
    "CHANNEL_ID2",
    "CHANNEL_ID3"
]; // You can put more channel ids as many as you want at here

client.on("messageCreate", async message => {
    if (!message.guild || message.guild.available === false || message.author.bot) return;
    if (globalChannels.includes(message.channel.id)) {
        const messageData = {
            embeds: [],
            files: []
        };
        const embed = new Discord.MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.member.displayAvatarURL({ dynamic: true, size: 256 }) })
            .setThumbnail(message.member.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter({ text: `${message.guild.name}・${message.guild.memberCount} Members`, iconURL: message.guild.iconURL({ dynamic: true, size: 256 }) })
            .setTimestamp()

        if (message.content) {
            embed.setDescription(`**Message:**\n>>> ${String(message.content).substring(0, 2000)}`)
        }
        let url = "";
        let imagename = "UNKNOWN";
        if (message.attachments.size > 0) {
            if (message.attachments.every(attachIsImage)) {
                const attachment = new Discord.MessageAttachment(url, imagename);
                messageData.files = [attachment]; // add the image file to the message of the BOT
                embed.setImage(`attachment://${imagename}`); //add the image to the embed, so it's inside of it!
            }
        }
        function attachIsImage(msgAttach) {
            url = msgAttach.url;
            imagename = msgAttach.name || `UNKNOWN`;
            return url.indexOf("png", url.length - 3) !== -1 || url.indexOf("PNG", url.length - 3) !== -1 ||
                url.indexOf("jpeg", url.length - 4) !== -1 || url.indexOf("JPEG", url.length - 4) !== -1 ||
                url.indexOf("gif", url.length - 3) !== -1 || url.indexOf("GIF", url.length - 3) !== -1 ||
                url.indexOf("webp", url.length - 3) !== -1 || url.indexOf("WEBP", url.length - 3) !== -1 ||
                url.indexOf("webm", url.length - 3) !== -1 || url.indexOf("WEBM", url.length - 3) !== -1 ||
                url.indexOf("jpg", url.length - 3) !== -1 || url.indexOf("JPG", url.length - 3) !== -1;
        }
        messageData.embeds = [embed];
        sendallGlobal(message, messageData);
    }
})
async function sendallGlobal(message, messageData) {
    message.react("🌐");
    let notincachechannels = [];
    message.channel.send(messageData).then(msg => {
    }).catch((O) => { })

    for (const chid of globalChannels) {
        let channel = client.channels.cache.get(chid);
        if (!channel) {
            notincachechannels.push(chid);
            continue;
        }
        if (channel.guild.id != message.guild.id) {
            channel.send(messageData).then(msg => {
            }).catch((O) => { })
        }
    }
    for (const chid of notincachechannels) {
        let channel = await client.channels.fetch(chid).catch(() => {
            console.log(`${chid} is not available!`)
        });
        if (!channel) {
            continue;
        }
        if (channel.guild.id != message.guild.id) {
            channel.send(messageData)
        }
    }
}
