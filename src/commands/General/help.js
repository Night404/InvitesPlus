const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "help",
      desc: "Gets a bot's help list.",
      usage: "[p]ping",
      category: "General",
      aliases: [],
      examples: []
    });
  }
  async run(client, message, args) {
    let prefix = client.settings.prefix
        const embed = new MessageEmbed()
      .setColor("#2f3136")
          .setAuthor(message.guild.name, message.guild.iconURL())
      .setFooter(`Requested by: ${message.author.tag} | ${client.commands.size}`);
    if(!args[0]){
    let General = client.commands.filter(x => x.category === "General").map(c => `\`${c.name}\``).join("**,** ");
    let GetMembers = client.commands.filter(x => x.category === "GetMembers").map(c => `\`${c.name}\``).join("**,** ");
    let Owner = client.commands.filter(x => x.category === "Owners").map(c => `\`${c.name}\``).join("**,** ");
let embed = new MessageEmbed()
.setColor("#00BFFF").setTitle(`${client.user.username} Commands List`)
.setDescription(`Do \`${client.settings.prefix}help <command/aliases/category>\` for more informations.`)
.addField("General Commands:", General)
.addField("GetMembers Commands:", GetMembers)
.addField("Owners Commands:", Owner)
.addField("Quick Links", `[Support Server](${client.settings.serverURL})`)
      .setFooter(`Requested by: ${message.author.tag} | ${client.commands.size}`, message.author.avatarURL());
  return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));

      if (command) {
        embed.setTitle(client.user.username + " Help");
        embed.addField("Command Name", command.name);
        embed.setDescription(`Description: ${command.desc || "None"}`);
        embed.addField(
          "Command Aliases",
          command.aliases.length !== 0
            ? command.aliases.join("|")
            : "No Aliases provided."
        );
        embed.addField(
          "Required Permission(s)",
          `Member: \`${
            command.memberPerm.length !== 0
              ? command.memberPerm.join("|")
              : "No Perm"
          }\`\nBot: \`${
            command.botPerm.length !== 0 ? command.botPerm.join("|") : "No Perm"
          }\``
        );
        embed.addField(
          "Command Usage",
          command.usage.replace("[p]", prefix) || `${prefix}${command.name}`
        );
        return message.channel.send(embed);
      } else {
        const cmds = client.commands.filter(
          c => c.category.toLowerCase() == args[0].toLowerCase()
        );

        if (!cmds || cmds.size == 0)
          return message.channel.send(embed.setDescription(`I can't find this \`<command/aliases/category>\``));
          embed.setTitle(`[ ${args[0].toUpperCase()} ] - ${cmds.size}`)
                embed.setDescription(`${cmds.map(x => `\`${x.name}\``).join("**,** ")}`)
        message.channel.send(embed);
}}
  }
};
