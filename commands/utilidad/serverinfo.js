const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "utilidad",
description: "Muestra la Informacion del Servidor",
usage: "[command]",
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let serverembed = new Discord.MessageEmbed()
.setTitle("Informacion del Servidor")
.setColor("RANDOM")
.setThumbnail(servericon)
.addField("Nombre del Servidor", message.guild.name)
.addField("Dueño", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("Canales", message.guild.channels.cache.size, true)
.addField("Roles", message.guild.roles.cache.size, true)
.addField("Creado el", message.guild.createdAt)
.addField("Se unio el", message.member.joinedAt)
.addField("Miembros totales", message.guild.memberCount)
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL);
message.channel.send(serverembed);
}
};