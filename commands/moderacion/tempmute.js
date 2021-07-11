const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name: "tempmute",
    category: "moderacion",
    description: "Mutea por un determinado tiempo al mencionado usuario",
    usage: "[COMANDO] + [usuario]",
   
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(':negative_squared_cross_mark:  `No tienes permisos de < MANAGE MESSAGES / Gestionar Mensajes > para usar este comando!`')
        
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(':negative_squared_cross_mark:  `No tengo los permisos de < MANAGE MESSAGES / Gestionar Mensajes > para ejecutar ese comando`.')
     .then(msg => {
    msg.delete({ timeout: 3000 })
  })
  .catch(console.error);  
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.reply(':negative_squared_cross_mark:  | **No se ha encontrado ese usuario, compruebe que lo haya escrito correctamente!**')
     .then(msg => {
    msg.delete({ timeout: 2000 })
  })
  .catch(console.error);  

        if(!time) return message.reply(':negative_squared_cross_mark:  | **Tiene que escribir el tiempo que necesita mutear al usuario!**')
     .then(msg => {
    msg.delete({ timeout: 3000 })
  })
  .catch(console.error);  
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.reply(':negative_squared_cross_mark:  | **No se ha encontrado el rol __Muted__, intentando crear el rol..!**')
     .then(msg => {
    msg.delete({ timeout: 2000 })
  })
  .catch(console.error);  

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.reply(':negative_squared_cross_mark:  | **El rol Muted ha sido creado!**')
     .then(msg => {
    msg.delete({ timeout: 3000 })
  })
  .catch(console.error);  
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`**${Member.displayName} ha sido muteado!**`)
        await Member.roles.add(role2)
        message.reply(`**${Member.displayName} ha sido muteado por __${time}__**`)
     .then(msg => {
    msg.delete({ timeout: 2000 })
  })
  .catch(console.error);  

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.reply(`**${Member.displayName} ha sido desmuteado!**`)
            .then(msg => {
    msg.delete({ timeout: 2000 })
  })
  .catch(console.error);  
        }, ms(time))
    }
}