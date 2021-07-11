const Discord = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
  name: "animesearch",
  category: "utilidad",
description: "Consigue informacion de un Anime",
usage: "[command | Anime]",
run: async (client, message, args) => {
//command
const search = `${args}`;
if(!search)
return message.reply('Agregue una consulta de búsqueda si el comando no válido no funciona.');

malScraper.getInfoFromName(search)
  .then((data) => {
  const malEmbed = new Discord.MessageEmbed()
    .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
    .setThumbnail(data.picture)
    .setColor('#ffc1cc') //I personally use bubblegum pink!
    .addField('Titulo', data.englishTitle, true)
    .addField('Titulo en japones', data.japaneseTitle, true)
    .addField('Tipo', data.type, true)
    .addField('Cantidad de Episodios', data.episodes, true)
    .addField('Rating', data.rating, true)
    .addField('Emitido', data.aired, true)
    .addField('Score', data.score, true)
    .addField('Score Stats', data.scoreStats, true)
    .addField('Link', data.url);

    message.channel.send(malEmbed);

  })
}
};