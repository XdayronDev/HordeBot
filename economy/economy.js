const config = require("../config.json");
/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)
 
This will create a unique ID for each guild member
*/
 
 
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");
 
//Create the bot client
const client = new Discord.Client();
 
//Set the prefix and token of the bot.
const settings = {
  prefix: (config.prefix),
}
 
//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
client.on('message', async message => {
 
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
 
  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
 
  if (command === 'balance') {
 
    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`Hey ${message.author.tag}! Tienes ${output.balance} monedas.`);
  }
 
  if (command === 'daily') {
 
    var output = await eco.Daily(message.author.id)
    //output.updated will tell you if the user already claimed his/her daily yes or no.
 
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`Acabas de reclamar tus monedas diaras! Ahora tienes ${profile.newbalance} monedas.`);
 
    } else {
      message.channel.send(`Lo siento ya no puedes reclamar tus monedas!\nPero no te preocupes , regresa ${output.timetowait} para reclamar!`)
    }
 
  }
 
  if (command === 'leaderboard') {
 
    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)
 
    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
    if (message.mentions.users.first()) {
 
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`El usuario ${message.mentions.users.first().tag} es el numero ${output} en mi tabla de clasificación!`);
 
    } else {
 
      eco.Leaderboard({
        limit: 3, //Only takes top 3 ( Totally Optional )
        filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
      }).then(async users => { //make sure it is async
 
        if (users[0]) var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
        if (users[1]) var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place
 
        message.channel.send(`Tabla de clasificación:
 
1 - ${firstplace && firstplace.tag || 'Nadie aun'} : ${users[0] && users[0].balance || 'None'}
2 - ${secondplace && secondplace.tag || 'Nadie aun'} : ${users[1] && users[1].balance || 'None'}
3 - ${thirdplace && thirdplace.tag || 'Nadie aun'} : ${users[2] && users[2].balance || 'None'}`)
 
      })
 
    }
  }
 
  if (command === 'transfer') {
 
    var user = message.mentions.users.first()
    var amount = args[1]
 
    if (!user) return message.reply('Responde al usuario al que deseas enviarle dinero!')
    if (!amount) return message.reply('Especifica la cantidad que quieres pagar!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('¡Tienes menos monedas que la cantidad que deseas transferir!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Transferencia de monedas realizada con éxito!\nBalance para ${message.author.tag}: ${transfer.FromUser}\nBalance para ${user.tag}: ${transfer.ToUser}`);
  }
 
  if (command === 'coinflip') {
 
    var flip = args[0] //Heads or Tails
    var amount = args[1] //Coins to gamble
 
    if (!flip || !['head', 'tails'].includes(flip)) return message.reply('Especifique el giro, ya sea cara [head] o cruz [tails!')
    if (!amount) return message.reply('Especifique la cantidad que desea apostar!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Tienes menos monedas que la cantidad que quieres apostar!')
 
    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`Acabas de  ${gamble.output}! Nuevo balance: ${gamble.newbalance}`)
 
  }
 
  if (command === 'dice') {
 
    var roll = args[0] //Should be a number between 1 and 6
    var amount = args[1] //Coins to gamble
 
    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Especifique el rollo, debe ser un número entre 1-6')
    if (!amount) return message.reply('Especifique la cantidad que desea apostar!')
 
    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Tienes menos monedas que la cantidad que quieres apostar!')
 
    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
    message.reply(`Los dados tirados ${gamble.dice}. Vos tambien ${gamble.output}! Nuevo balance: ${gamble.newbalance}`)
 
  }
 
  if (command === 'work') { //I made 2 examples for this command! Both versions will work!
 
    var output = await eco.Work(message.author.id)
    //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
    if (output.earned == 0) return message.reply('Aww, no hiciste bien tu trabajo así que no ganaste nada!')
    message.channel.send(`${message.author.username}
Trabajaste como \` ${output.job} \` y has ganado :money_with_wings: ${output.earned}
Ahora tienes :money_with_wings: ${output.balance}`)
 
 
    var output = await eco.Work(message.author.id, {
      failurerate: 30,
      money: Math.floor(Math.random() * 500),
      jobs: ['cajero', 'Programador', 'stripper', 'gerente', 'Camarero', 'actor porno', 'streamer', 'fotografo de onlyfans :flushed:', 'Musico', 'productor']
    })
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply('¡Aww, no hiciste bien tu trabajo así que no ganaste nada!')
 
    message.channel.send(`${message.author.username}
Trabajaste como \` ${output.job} \` y ganastes :money_with_wings: ${output.earned}
Ahora tienes :money_with_wings: ${output.balance}`)
 
  }
 
  if (command === 'slots') {
 
    var amount = args[0] //Coins to gamble
 
    if (!amount) return message.reply('Especifique la cantidad que desea apostar!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Tienes menos monedas que la cantidad que quieres apostar!')
 
    var gamble = await eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error)
    message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
    message.reply(`Tu ${gamble.output}! Nuevo balance: ${gamble.newbalance}`)
 
  }
 
});
 
//Your secret token to log the bot in. (never show this to anyone!)
client.login(config.token)