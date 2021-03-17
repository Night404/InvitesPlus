const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "order",
      desc: "Shows the current order of the guild.",
      usage: "[p]order",
      category: "GetMembers",
      aliases: [],
      examples: []
    });
  }
  async run(client, message, args) {
    let data = (await client.db.get(`code_${message.guild.id}`));
    let orders = (await client.db.get(`orders_${message.guild.id}`));
    let uses = (await client.db.get(`uses_${message.guild.id}`)) || 0;
     if (data == 0) return message.channel.send(`There isn't any order in this guild.`)
    
    let bar = []
    
    let progress = uses
    
    for (let i = 0;i < 10;i++) {
      progress = progress - (data.orders / 10)
      if (progress > 0) bar.push(`#`)
      else bar.push(`=`) 
    }
    
    let warn = ""
    
    await client.fetchInvite('https://discord.gg/' + data).catch(e => warn = "The invite link of this guild is expired! Please make a new order or no one will be able to join here!")
    
    let embed = new MessageEmbed()
    .setColor("#00BFFF")
    .setTitle(`${message.guild.name} Order:`)
    .setDescription(`Order: ${orders}\nProgress: ${bar.join("")} ${uses}/${orders}`)
    message.channel.send(warn, embed)
  }
};
