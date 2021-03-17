const Discord = require("discord.js");
const { Client, MessageEmbed , Collection} = require("discord.js");
const client = new Client()
const settings = require("./settings.js")
const { Database } = require("quickmongo");
client.on("ready", () => {
});
const { registerCommands, registerEvents } = require("./utils/registry");
(async () => {
  client.commands = new Collection();
  client.aliases = new Collection();
  client.events = new Collection();
  client.settings = settings;

  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(client.settings.token);
const db = new Database(client.settings.mongoDB)
client.db = db
})();






//at3ml be eh? hmm 