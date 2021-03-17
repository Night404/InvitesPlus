const BaseEvent = require("../utils/structures/BaseEvent");


const Discord = require("discord.js");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {
    if (message.author.bot) return;
 
    if (
      message.content.toLowerCase() === `<@${client.user.id}>` ||
      message.content.toLowerCase() === `<@!${client.user.id}>`
    ) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `Prefix of **__${message.guild.name}__** is: \`${client.settings.prefix}\``
          )
      );
    }
    if (message.content.toLowerCase().startsWith(client.settings.prefix)) {
      if (message.author.bot || message.channel.type === "dm") return;
      let black = await client.db.fetch(`blacklist_${message.author.id}`);
      if(client.settings.owner.includes(message.author.id)) black = false;
    // await client.db.set(`coins_357856683503910912`, 100)
      const args = message.content
        .slice(client.settings.prefix.length)
        .trim()
        .split(/ +/);
      let cmd = args.shift().toLowerCase();
      
      const command =
        client.commands.get(cmd) ||
        client.commands.get(client.aliases.get(cmd));
      const aliases = [];
      if (!command) return;
         if(black){
        return message.channel.send("You're blacklisted join the server support and call the developers /;")
      }
      command.aliases.forEach(c => aliases.push(c));
      if (command) {
        command.run(client, message, args);
   
      }
    }
  }};