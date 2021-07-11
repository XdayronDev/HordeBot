const Discord = require('discord.js');
module.exports = {
    name: "nuke",
    category: "moderacion",
    description: "Elimina el canal y crea uno nuevo.",
    usage: "[COMANDO]",
     async run (client, message, args) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('❎ | `No tienes permisos de < MANAGE CHANNELS / Gestionar Canales > para poder usar este comando.`')
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('❎ | `No tengo permisos de < MANAGE CHANNELS / Gestionar Canales >.`')
    
    let bot = client.user.username;
    let botavatar = client.user.avatarURL();

    let embed = new Discord.MessageEmbed()
    .setAuthor(bot, botavatar)
    .setDescription("<a:catexplosion:857179124871200788>  **¡Este canal ha sido __explotado!__**  <a:catexplosion:857179124871200788> ")
    .setColor('RANDOM')
    .setImage("https://cdn.discordapp.com/attachments/856771114667606027/856771195507834890/creeper.gif")
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
    let pos = message.channel.position

    message.channel.clone().then(c => {
      message.channel.delete()
      c.setPosition(pos)
      c.send(embed)
    })
  }
}
