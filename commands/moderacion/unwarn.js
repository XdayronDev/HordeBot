const Discord = require('discord.js');
const client = new Discord.Client(); 

const db = require ("megadb")
let warns = new db.crearDB ("warns");
module.exports = {
    name: "Unwarn",
    category: "moderacion",
    description: "Elimina el warn del mencionado usuario",
    usage: "[COMANDO] + [Usuario]",
   run : async(client, message, args) => { //Creamos el comando

  if(!message.member.hasPermission("ADMINISTRATOR")){ //Los permisos
    return message.channel.send("Mensaje") //El mensaje de retorno
  }

let woser = message.mentions.members.first() //Definimos woser
if(!woser){ 
  return message.channel.send("Menciona a un usuario.") //Si no hay usuario retorna
}
  if(warns.tiene(`${message.guild.id}.${woser.id}`)) { //Buscamos los datos de Warns
    let count = await warns.obtener(`${message.guild.id}.${woser.id}`) //hacemos count
    warns.restar(`${message.guild.id}.${woser.id}`, 1) //Eliminamos 1 warn
    const warmed = new Discord.MessageEmbed() //creamos embed
    .setTitle(":warning: Unwarn Eliminado :warning: ") //Titulo
    .setDescription(`:bust_in_silhouette: ** Usuario: ** <@${woser.id}>  \n :no_entry_sign:  ** Warns totales del Usuario: ** \`${count}\` `) //Descripcion
    .setColor("RANDOM") //Color Random
    message.channel.send(warmed)
  }
}}