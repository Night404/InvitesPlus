const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "buy",
      desc: "Gets a new members for your server",
      usage: "[p]buy [UsersNumber] [Message]",
      category: "GetMembers",
      aliases: [],
      examples: ["1 Gaming Server"]
    });
  } //discord bos kda discord 
  async run(client, message, args) {
     let amount = Number(args[0])
    let description = args.slice(1).join(" ")
    let coins = await client.db.fetch(`coins_${message.author.id}`);
    if(coins === null) coins= "0"
    if (coins < 3) return message.channel.send(`You Need Atleast 3 coin to buy ad ! try joining some servers By \`s!find\` and join them will give you +1 coins . If you left the server before 3 days of joing you will lose -2 coins from your balance `)
    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(`Invalid amount has been provided, try running the command again and putting a valid amount of coins.`)

    if (amount > coins) return message.channel.send(`${message.author.username} you don't have enough Balance. You only have ${amount} coins.\n\n\`If you Are Getting this ! please Try joining Some servers First then Try this command again\``)

    amount = Math.round(amount)

    let link = client.db.get(`code_${message.guild.id}`)

    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })

      link = link.code
    }

    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link)
    })

    if (description && description.includes("discord.gg")) return message.channel.send(`Invalid Message provided. Pls dont provide any discord links`)

    if (description && description.length > 300) return message.channel.send(`The Message exceed the limit of 300 words`)

    message.channel.send(`Succesfully bought ${amount} coins for your server, you can see the currents order with \`s!order\`|\`s!info\`.`)
    let Ad = {
      Data: `[-${amount}] - Advertise ${message.guild.name} server.`
    }
    await new Promise(resolve => setTimeout(resolve, 100))

    await client.db.set(`code_${message.guild.id}`, link)
    
    await client.db.push(`DONE_${message.author.id}`, Ad)

    await client.db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`)

    await client.db.add(`orders_${message.guild.id}`, amount)

    await client.db.subtract(`coins_${message.author.id}`, amount)
  }
};
