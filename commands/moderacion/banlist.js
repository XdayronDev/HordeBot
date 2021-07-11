const Discord = require('discord.js');
module.exports = {
    name: "banlist",
    category: "moderacion",
    description: "Muestra una lista de baneos del servidor",
    usage: "[COMANDO]",
   run : async(client, message, args) => {

     //exportamos
    const Discord = require('discord.js') //llamamos a Discord
    const { splitMessage } = require('discord.js') //llamamos a splitMessage que lo usaremos más tarde, ustedes pueden usar const { Discord, splitMessage } = require('discord.js'), para simplificar
    
    let perms = message.guild.me.hasPermission("BAN_MEMBERS") //comprobamos que el bot tenga permisos
    if (!perms) return message.reply("<:Cross:746056185832013946> | No tengo permisos").then(m => m.delete({ timeout: 6000 })); //si no tiene, que retorne
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('<:Cross:746056185832013946> | Necesitas el permiso `BAN_MEMBERS` Para ver la lista de baneos.').then(m => m.delete({ timeout: 6000 })); //comprobamos que el usuario tenga el permiso de banear miembros para ejecutar el comando, usteder ponganle el que quieran recomiendo MANAGE_MESSAGES

    var blist = await message.guild.fetchBans(); //buscamos a los usuarios baneados
    if(blist.size <= 0) return message.channel.send("<:Cross:746056185832013946> | No hay baneos en el servidor.") //si el número de baneos es menor o igual a 0 que retorne
    var bansID = blist.map(b => '**'+b.user.username +'**: '+ b.user.id).join('\n') //aquí es donde definimos para que nos de el nombre y id de los usuarios baneados
    const description = '**📌 Usuario y ID:** \n'+bansID //defino description, yo lo he hecho para poder hacer el splitMessage,  que es que si la cantidad de caracteres en la descripción supera al limite de discord, continue enviando el resto de baneos en otro mensage

    let embed = new Discord.MessageEmbed() //definimos el embed
    .setColor("RANDOM")
    .setTitle('<:martilloban:856765772310380614> | Banlist de **'+message.guild.name+'**')
    .setDescription(description)
    .setFooter('Pedido por: '+message.author.username, message.author.displayAvatarURL())
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))

    const splitDescription = splitMessage(description, {
        maxLength: 2048,
        char: "\n",
        prepend: "",
        append: ""
    }); //aquI decimos que si la description que es la que habíamos definido antes, supera el límite de 2048 se envíe a mensaje
  
    splitDescription.forEach(async (m) => {
        embed.setDescription(m);
        message.channel.send(embed).then(m => m.delete({ timeout: 20000 })) //enviamos el mensaje y pones de tiempo 20s
    });
//si os ha gustado este pequeño y sencillo comando, agradecería que le dieran me gusta, y si veo que les gusta mucho seguiré subiendo más comandos por el estilo =^^=
}}