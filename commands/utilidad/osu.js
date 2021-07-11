const Discord = require('discord.js')
const osu = require('node-osu');
//PUT YOUR OSU API KEY INSIDE THE QUOTATION MARKS
const api = new osu.Api("a985b868ef988f0516d247e4161ca862f069736d" , {
// END OF OSU API KEY
    notFoundAsError: true,
    completeScores: false 
})

module.exports = {
  name: "osu",
  category: "utilidad",
description: "Consigue informacion de un usuario de Osu!",
usage: "[command | Nickname]",
run: async (bot, message, args) => {
//command

let username = args[0]
  
  
if (!args[0]) return message.channel.send('Por Favor escribe un nombre de usuario correctamente (osu!)')

api.getUser({u: username}).then(user => {
const osu = new Discord.MessageEmbed()
.setTitle('User Osu Search System')
.setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
.setColor("#D0436A")
.addField('Nickname', user.name)
.addField('PP', Math.round(user.pp.raw))
.addField('Rank', user.pp.rank)
.addField('Nivel', Math.round(user.level))
.addField('Pais', user.country)
.addField('Rank en el Pais', user.pp.countryRank)
.addField('Jugadas', user.counts.plays)
.addField('Accuracy', `${user.accuracyFormatted}`)
.setFooter('Pedido por ' + message.author.tag, message.author.avatarURL)
message.channel.send(osu)

})

}
};