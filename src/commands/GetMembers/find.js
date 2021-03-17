const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "find",
      desc: "Displays 3 servers to join in and gain coins.",
      usage: "[p]find",
      category: "GetMembers",
      aliases: [],
      examples: []
    });
  } 
  async run(client, message, args) {
    let orders = await client.db.startsWith(`orders_`, { sort: ".data" })
    let length = 1
    orders = orders.filter(x => x.data > 0 && client.guilds.cache.get(x.ID.split("_")[1]) && client.guilds.cache.get(x.ID.split("_")[1]).members.cache.get(message.author.id) === undefined)
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`__Servers to join and Earn Coins__`)
      .setDescription(`You'll get 1 coin per server joined,  if you leave before 3 days have passed you will lose 2 coins.\n\n **__List Of Servers__** `)
    for (let i = 0; i < orders.length; i++) {

      let handler = true

      if (length > 3) { } else {

        let id = orders[i].ID.split("_")[1]

        let guild = client.guilds.cache.get(orders[i].ID.split("_")[1])

        let code = await client.db.fetch(`code_${guild.id}`)


        await client.fetchInvite("https://discord.gg/" + code)
          .then(link => {
            console.log(link.code)
            if (link.code === null) handler = false
          })
          .catch(error => {
            handler = false
          })

        await new Promise(resolve => setTimeout(resolve, 1))

        if (handler) {
          let description = await client.db.fetch(`description_${guild.id}`)

          embed.addField(`**__${guild.name}__** `, description, false)
          length++
        }
      }
    }

    embed.addField(`There is no servers to join ?`, `There probably isn't any guild available for you to join, Try after 5 mins later`, false)

    message.channel.send(embed)
  }
};
