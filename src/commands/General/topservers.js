const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "topservers",
      desc: "Gets a top 10 server",
      usage: "[p]ping",
      category: "General",
      aliases: ["t-servers"],
      examples: []
    });
  }
  async run(client, message, args) {
       let obj = [] 
 client.guilds.cache.map(async x => {
      obj.push({
        name: x.name,
        members: x.memberCount
      }) 
    }) 
   
    
    let content = []
    
    let size = obj.length
    
    if (size > 10) size = 10
    
    obj = obj.sort((x, y) => y.members - x.members) 
    
    for (let i = 0;i < size;i++) {  
      content.push(`**__${i + 1}# - ${obj[i].name}__**:\n${obj[i].members} members.`) 
    }
    
    let embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Servers List:`)
    .setDescription(content.join("\n")) 
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Top 10 server where i am in`) 
    message.channel.send(embed) 
  }
};
