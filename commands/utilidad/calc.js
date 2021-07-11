const utils = require('../../utils');

const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

module.exports = {
  name: "calc",
  aliases: ["calculate"],
  category: "utilidad",
  description: "Calcula cualquier ecuacion matematico",
  usage: "[command | ecuacion]",
  run: async (client, message, args) => {
  //command
  
  if(args.length < 1)
  return message.reply(`Debes proporcionar una ecuación para que se resuelva en la calculadora.`);

const question = args.join(' ');

let answer;
if(question.indexOf('9 + 10') > -1) {
  answer = '21';
} else {
  try {
      answer = math.eval(question);
  } catch (err) {
      message.channel.send(`Ecuacion matematico Invalido: ${err}`);
  }
}

message.channel.send({
  embed: utils.embed('', stripIndents`
  **Ecuacion:**\n\`\`\`\n${question}\n\`\`\`
  **Respuesta:**\n\`\`\`\n${answer}\n\`\`\`
  `)
});
  }
  };