const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "mute",
    category: "moderacion",
    description: "Silencia al mencionado Usuario.",
    usage: "[COMANDO] + [Usuario]",

  async run (client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(':negative_squared_cross_mark:  `No tienes permisos de < MANAGE MESSAGES / Gestionar Mensajes > para usar este comando!`')
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(':negative_squared_cross_mark:  `No tengo los permisos de < MANAGE MESSAGES / Gestionar Mensajes > para ejecutar ese comando`.')
        .then(msg => {
    msg.delete({ timeout: 3000 })
  })
  .catch(console.error);  
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.reply(':negative_squared_cross_mark:  | `Usuario no encontrado`')
        .then(msg => {
    msg.delete({ timeout: 3000 })
  })
  .catch(console.error);  
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send(':negative_squared_cross_mark:  | `No se ha encontrado el rol Muted, intentando crear el rol..`')
                .then(msg => {
    msg.delete({ timeout: 2000 })
  })
  .catch(console.error);  

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'Muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send(':negative_squared_cross_mark: Algo salio mal, Intenta de nuevo')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.reply(`${Member.displayName} **ya ha sido muteado!**.`)
        .then(msg => {
    msg.delete({ timeout: 3000 })
  })
  .catch(console.error);
      }
}  
