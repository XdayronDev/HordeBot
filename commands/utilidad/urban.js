const Discord = require('discord.js')
const urban = require('urban.js')

module.exports = {
    name: "urban",
    category: "utilidad",
  description: "Definiciones del mundo urbano",
  usage: "COMMAND [Tu palabra]",
  run: async (client, message, args) => {
  //command
  const bargs =  message.content.split(' ');
  const searchString = bargs.slice(1).join(' ')
  if(!searchString)return message.channel.send(`You have to type in word`)
  
  
  
urban(searchString).then(urbans=>{
  
  message.channel.send({embed: {
          
      description: `__**${urbans.word}**__\n\n**Definicion**\n${urbans.definition}\n\n**Ejemplo**\n${urbans.example}\n\n**Etiquetas:** ${urbans.tags}\n\n👍 **${urbans.thumbsUp}** *Les gusto* **|** 👎 **${urbans.thumbsDown}** *No les gusto*`,
      author: {
          name: message.author.username,
          icon_url: message.author.avatarURL,
      },
      color: 0xff0000,
  

      timestamp: new Date(),
  
  }
})
})

  }
  };