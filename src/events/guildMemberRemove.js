const BaseEvent = require("../utils/structures/BaseEvent");


const Discord = require("discord.js");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("guildMemberRemove");
  }

  async run(client, member) {
   
    let data = (await client.db.get(`code_${member.guild.id}`)); 
    let orders = (await client.db.get(`orders_${member.guild.id}`));  
    let uses = (await client.db.get(`uses_${member.guild.id}`));
    
    if (data == 0) return
    
    let link = await client.fetchInvite(`https://discord.gg/${data}`)
    
    if (link === undefined) return;
            
     await client.db.subtract(`coins_${member.user.id}`, 1)
      
      let Ad = {Data:`[-1] - Left a server `}
 await client.db.push(`DONE_${member.user.id}`, Ad)
      
  }};