const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "wallpaper",
  category: "SFW",
  description: "envía un fondo de pantalla al azar",
  usage: "[command]",
  run: async (client, message, args) => {
  //command

        async function work() {
        let owo = (await neko.sfw.wallpaper());

        const wallpaper = new Discord.MessageEmbed()
        .setTitle("Random Wallpaper")
        .setImage(owo.url)
        .setColor(`#000000`)
        .setURL(owo.url);
        message.channel.send(wallpaper);

}

      work();
}
                };