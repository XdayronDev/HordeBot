var figlet = require('figlet');
const utils = require('../../utils');

module.exports = {
  name: "ascii",
  category: "Diversion",
description: "Convierte información de texto ASCII",
usage: "[command | Tu texto]",
run: async (client, message, args) => {
//command
var maxLen = 100 // Kendiniz en y�ksek harf sayisini ayarlayabilirsiniz
  
  if(args.join(' ').length > maxLen) return message.channel.send(`The max length is ${maxLen}!`) 
  
  if(!args[0]) return message.channel.send('Please enter some text.');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('k...');
          console.dir(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });

}
};