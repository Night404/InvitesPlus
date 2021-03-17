const path = require("path");

const fs = require("fs").promises;

const BaseCommand = require("./structures/BaseCommand");

const BaseEvent = require("./structures/BaseEvent");

async function registerCommands(client, dir = "") {

  const filePath = path.join(__dirname, dir);

  const files = await fs.readdir(filePath);

  for (const file of files) {

    const stat = await fs.lstat(path.join(filePath, file));

    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));

    if (file.endsWith(".js")) {

      const Command = require(path.join(filePath, file));

      if (Command.prototype instanceof BaseCommand) {

        const cmd1 = new Command();

        client.commands.set(cmd1.name, cmd1);
                         
        if (cmd1.aliases) cmd1.aliases.forEach(cmd =>   client.aliases.set(cmd, cmd1.name));
//        if (cmd1.category) cmd1.category.forEach(cmd =>   client.category.set(cmd, cmd1.category));


      }

    }

  }

}

async function registerEvents(client, dir = "") {

  const filePath = path.join(__dirname, dir);

  const files = await fs.readdir(filePath);

  for (const file of files) {

    const stat = await fs.lstat(path.join(filePath, file));

    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));

    if (file.endsWith(".js")) {

      const Event = require(path.join(filePath, file));

      if (Event.prototype instanceof BaseEvent) {

        const event = new Event();

        client.events.set(event.name, event);

        client.on(event.name, event.run.bind(event, client));

      }

    }

  }

}

module.exports = {

  registerCommands,

  registerEvents,

};