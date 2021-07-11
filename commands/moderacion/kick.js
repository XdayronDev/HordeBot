const Discord = require('discord.js');
module.exports = {
    name: "kick",
    category: "moderacion",
    description: "expulsa al mencionado usuario",
    usage: "[COMMAND] + [Usuario]",
    async run (client, message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(':negative_squared_cross_mark:  | `No tienes permisos de < KICK MEMBERS / Kickear Usuarios >.`')

        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(':negative_squared_cross_mark:  | `No tengo permisos de < KICK MEMBERS / Kickear Usuarios >.`')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send(':negative_squared_cross_mark:  | **Debes mencionar al usuario que deseas kickear del servidor!**');

        if(!member) return message.channel.send(':negative_squared_cross_mark:  | **Lo lamento, no encontré a ese usuario. Compruebe que esté en su servidor!**');
        if(!member.kickable) return message.channel.send(':negative_squared_cross_mark:  | **Lo siento! No puedo expulsar a ese usuario, revise que no sea algún mod/admin o que mi rol sea superior al de ellos.**');

        if(member.id === message.author.id) return message.channel.send('**No es necesario hacer eso.. si deseas puedes salirte manualmente del servidor no es tan dificil** 🙄!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Indefinida.';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send(':negative_squared_cross_mark:  | **Oh oh, algo salió mal..**')
        })
        ////    COLORS  /////
        var Colores = ["0xFF0000", "0x#FF9700", "0x#C1FF00", "0x00FF6C", "0x008BFF", "0xBD00FF", "0xEA67CE", "0xF06A82", "0x00FF4D"];
        var Select =  Math.floor(Math.random()*(Colores.length));{ 
            ///// END COLORS

        const kickembed = new Discord.MessageEmbed()
        .setColor(Colores[Select])
        .addField(':bust_in_silhouette: __Usuario Kickeado:__', member)
        .addField(':id:  __ID del Usuario:__', member.id)
        .addField(':microphone:  __Kickeado por el Moderador:__', message.author)
        .addField('<:panelinfo:857185924076011521> __Razón:__', reason)
        .setFooter(" HORDESYSTEM")
        .setTimestamp()

        message.channel.send(kickembed);


    }
}
}