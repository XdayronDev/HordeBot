const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const utils = require('../../utils');

module.exports = {
  name: "cuddle",
  category: "Expresiones",
  description: "abraza a un usuario mencionado",
  usage: "[command] + [user]",
  run: async (client, message, args) => {
  //command

        const user = message.mentions.users.first();
        if(!user)
        return message.reply('Menciona a alguien que quieras abrazar');

        async function work() {
        let owo = (await neko.sfw.cuddle());

        const cuddleembed = new Discord.MessageEmbed()
        .setTitle(user.username + " ¡Acabas de recibir un abrazo! ")
        .setDescription((user.toString() + " recibió un abrazo de " + message.author.toString()))
        .setImage(owo.url)
        .setColor(`#000000`)
        .setURL(owo.url);
        message.channel.send(cuddleembed);

}

      work();
}
                };