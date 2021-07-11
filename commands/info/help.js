const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const utils = require('../../utils');

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Devuelve todos los comandos o la información de un comando específico",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        // If there's an args found
        // Send the info of that command found
        // If no info found, return not found embed.
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            // Otherwise send all the commands available
            // Without the cmd info
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor("#FFDFD3")
        .setThumbnail("https://cdn.discordapp.com/attachments/856771114667606027/858972193127006228/logo.png")
        .setTitle('Ayuda de Comandos')
        .setURL('https://youtu.be/WB9c5avV8uU')
        .addField("‎ ", "<:supporthorde:857187237417451540>  [Servidor de Soporte](https://discord.gg/3C566R4kNh)")

        .addField("‎ ", "<:B0t:857186050296119307>  [Invitación del Bot `📌`](https://discord.com/oauth2/authorize?client_id=858987930882277388&scope=bot&permissions=8)")
    
        .addField("‎ ", "<:njs:857186016124993556> **Bot Creado gracias a** [Node.js `🌟`](https://nodejs.org/es/)")
        .setFooter("Para ver las descripciones de los comandos y el tipo de uso !help [Nombre del comando]")
    // Map all the commands
    // with the specific category
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(", ");
    }

    // Map all the categories
    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

        message.reply('Checa el MD :eyes:')

        

    return message.author.send(embed.setDescription(info));
    
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    // Get the cmd by the name or alias
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `Informacion no encontrada **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Nombre del comando**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Descripcion**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Uso**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = requerido, [] = opcional`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}