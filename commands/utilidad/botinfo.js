const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")




module.exports = {
    name: "botinfo",
    category: "utilidad",
  description: "Envia detalladamente la informacion del bot al cliente de Discord",
  usage: "[command]",
  run: async (client, message, args) => {
  //command
  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
          return console.log(err);
      }
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const botinfo = new Discord.MessageEmbed()
          .setTitle("__**HordeInfo:**__")
          .setColor("RANDOM")
          .addField("⏳ Memoria Usada", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField("⌚️ Uptime ", `${duration}`, true)
          .addField("📁 Usuarios Activos", `${client.users.cache.size}`, true)
          .addField("📁 Servidores Activos", `${client.guilds.cache.size}`, true)
          .addField("📁 Canales ", `${client.channels.cache.size}`, true)
          .addField("👾 Discord.js", `v${version}`, true)
          .addField("🤖 Node", `${process.version}`, true)
          .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("🤖 CPU Usado", `\`${percent.toFixed(2)}%\``, true)
          .addField("🤖 Arquitectura", `\`${os.arch()}\``, true)
          .addField("💻 Plataforma", `\`\`${os.platform()}\`\``, true)
          .addField("Latencia API", `${(client.ws.ping)}ms`)  
      message.channel.send(botinfo)
  });
  }
  };