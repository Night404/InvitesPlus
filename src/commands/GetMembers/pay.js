const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "pay",
      desc: "Pay Coins to Someone",
      usage: "[p]pay {user} [amount]",
      category: "GetMembers",
      aliases: [],
      examples: []
    });
  }
  async run(client, message, args) {
  let amount = args[1]
  let user = message.mentions.users.first();
  if(!user) return message.channel.send(new MessageEmbed().setDescription("Make sure to mention a user!!").setColor("#cf1919"))
  let coins = await client.db.get(`coins_${message.author.id}`)
  if(!amount) return message.channel.send(new MessageEmbed().setDescription("Make sure to type a money!!").setColor("#cf1919"))
    if (coins < Number(amount)) return message.channel.send(`You dont have **__${amount}__** coins.`)
    
    if (Number(amount) < 10) return message.channel.send(`Minimum payment is 10 coins.`)
    
    if (user.id === message.author.id) return message.channel.send(`You can't pay yourself.`)
    
    if (user.bot) return message.channel.send(`You can't pay To bots`)
    
    message.channel.send(`You've paid ${user} for **__${amount}__** coins! [-${amount}]`)
    let Ad = {Data:`[- ${amount}] - You've paid ${user.tag}`}
    let Ad1 = {Data:`[- ${amount}] - ${message.author.tag} paid you`}
    
  await client.db.subtract(`coins_${message.author.id}`, Number(amount))
  
    await client.db.push(`DONE_${message.author.id}`, Ad)
    await client.db.push(`DONE_${user.id}`, Ad1)
  await  client.db.add(`coins_${user.id}`, Number(amount)) }
};
