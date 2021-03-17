const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "report",
      desc: "Report bugs of the bot that you saw.",
      usage: "[p]report",
      category: "General",
      aliases: [],
      examples: []
    });
  }
  async run(client, message, args) {
 let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle(`Have you found a bug?`)
    .setDescription(`Try reporting the bug in 2 Minutes ! else this report will get expire ! if your bug is founded good to developer team then you will be rewarded coins according to bug`)
  message.channel.send(embed)
    .then(msg => {
     
      let filter = m => m.author.id === message.author.id
      
      msg.channel.awaitMessages(filter, { max: 1, errors: ["time"], time: 120000 })
      .then(collected => {
        let message = collected.first()
      let embed1 = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle(`Thanks ${message.author.tag}`)
    .setDescription("Thx, Your report has been successfully sent to our Developers Team")
    .setFooter(`${client.user.username} - Report System.`)
    msg.edit(embed1)
        let channel = client.channels.cache.get(client.settings.report)
        
        let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
        .setTitle(`Bug Report by ${message.author.tag}:`)
        .setDescription(message.content)
        channel.send(embed) 
      })
      .catch(error => {
        let embed1 = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription("You took long, bye /;")
    return msg.edit(embed1)
      }) 
    })   

}
};
