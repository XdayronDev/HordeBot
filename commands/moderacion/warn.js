const Discord = require('discord.js');
const client = new Discord.Client(); 

const db = require ("megadb")
let warns = new db.crearDB ("warns");

module.exports = {
    name: "warn",
    category: "moderacion",
    description: "Warnea al mencionado usuario",
    usage: "[COMANDO] + [usuario]",
   run : async(client, message, args) => {//abrimos el cmd
  
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes los permisos `ADMINISTRADOR`.")//aca vemos si el usuario tienes permisos
  let persona = message.mentions.users.first();
  if(!persona) return message.channel.send("X | Menciona para dar una advertencia")//confirmamos si menciono algun usuario
  var razon = args.slice(1).join(' ') //Una razon ("Sin Razon" por Default)
        if(!razon) {
          razon = `Sin Razon` 
        }
				
        razon = razon
  if(razon.length > 1024) return message.channel.send('La razon no puede exceder los 1024 caracteres')//aca ponemos un limite de caracters esta funcion la copie de u/zicktron
  if(!warns.tiene(`${message.guild.id}.${persona.id}`)) warns.establecer(`${message.guild.id}.${persona.id}`, 0) //Verificamos si la db no tiene datos guardados, En caso de que no tenga los establecemos
warns.sumar(`${message.guild.id}.${persona.id}`, 1)


  const wembed = new Discord.MessageEmbed() // aca creamos un embed
  .setColor("BLUE")
  .setTitle("Has sido advertido")
  .setDescription(`El moderador ${message.author.username} te warneo`)
  .addField("La Razon:", `${razon}`)
  .addField("Cantidad de warn/s", `${await warns.obtener(`${message.guild.id}.${persona.id}`)}`)
  persona.send(wembed)//aca lo enviamos ala persona advertida
   }}