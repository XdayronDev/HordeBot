    const Discord = require("discord.js")

    module.exports = {
    name: "whois",
	aliases: ["info"],
    category: "utilidad",
    description: "Consigue informacion de un Usuario",
    usage: "[command | Usuario]",
    run: async (client, message, args) => {
    //command
    
{
    const user = message.mentions.users.first();
    if(!user)
        return message.reply('Menciona a uno para saber quien es');
    
    var playing = ("[ " + user.presence.activities + " ]")
    
    const whothefuq = new Discord.MessageEmbed()
          .setTitle("informacion de Usuario:")
          .addField("Nombre de Usuario", `${user.tag}`)
          .addField("ID", user.id)
          .addField("Jugando",playing, true)
          .addField("Estado", `${user.presence.status}`, true)
          .addField("Se unio a Discord el", user.createdAt)
          .setColor("RANDOM")
          .setTimestamp()
          .setThumbnail(user.avatarURL())  
      message.channel.send(whothefuq)

    };
    }
       
  
    
    };