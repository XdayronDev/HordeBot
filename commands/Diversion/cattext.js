const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const utils = require('../../utils');


module.exports = {
    name: "Diversion",
    category: "fun",
  description: "Envía owo nya lindo anime waifu texto cosas",
  usage: "[command]",
  run: async (client, message, args) => {
  //command

    async function work() {

        let owo = (await neko.sfw.catText());
        message.channel.send(owo.cat).catch(error => {
            console.error(error);
        });

      }

      work();
  }
  };