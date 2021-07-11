const Discord = require('discord.js')

module.exports = {
    name: "unban",
    category: "moderacion",
    description: "Desbanea al usuario mediante ID",
    usage: "[COMANDO] + [ID del usuario]",
  
  async run (client, message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('<:Cross:784470068729085982> | `¡No tienes permisos de < BAN MEMBERS / Banear Miembros > para poder usar este comando! (En este caso desbanearas)`')

        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('<:Cross:784470068729085982> | `¡No tengo permisos de < BAN MEMBERS / Banear Miembros >! (En este caso desbanearas)`')

        if (!args[0]) return message.channel.send(':warning: | **Escriba la ID del usuario al que desea desbanear!**').then(m => m.delete({ timeout: 5000 }));

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send(':x: | **No es un usuario válido**').then(m => m.delete({ timeout: 5000 }));
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new Discord.MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {
                embed.setTitle(`El usuario ${user.user.tag} ha sido desbaneado correctamente!`)
                    .setColor('RANDOM')
                    .setThumbnail("https://cdn.discordapp.com/emojis/856777801839673364.png?v=1")
                    .addField('**User ID:**', user.user.id, true)
                    .addField('**User Tag:**', user.user.tag, true)
                    .addField('**Razón de su desbaneo:**', reason)
                    
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`**${member.tag}** **no está baneado!**`)
                    .setColor('RANDOM')
                message.channel.send(embed)
            }

        }).catch(e => {
            console.log(e)
            message.channel.send(':negative_squared_cross_mark:  | **Ha ocurrido un error :(**')
        });

    }
}