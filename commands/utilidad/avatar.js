const Discord = require("discord.js")

module.exports = {
    name: "avatar",
    category: "utilidad",
    description: "Consigue el avatar de un usuario",
    usage: "[command | usuario]",
    run: async(client, message, args) => {

        //command

        /* If user isnt found it selects ur profile */
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

        if (!member.user.avatarURL) return message.channel.send(`Este usuario no tiene avatar`);

        const avatar = new Discord.MessageEmbed()
			.setTitle(` Avatar de ${member.user.username}'`)
            .setColor("RANDOM")
            .setImage(member.user.avatarURL())
            .setColor(member.displayHexColor)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setURL(member.user.avatarURL())
        message.channel.send(avatar)
            // If bot doesnt have embed perms 
            .catch(() => message.channel.send('**Error:** Missing permission `Embed link` '));

    }

};