
const fs = require('fs');
const Discord = require('discord.js');
const log = require(`leekslazylogger`);
const config = require('./config.json');
const { openTicket, closeTicket, purTicket, bugTicket } = require('./controllers/ticket.js')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const now = Date.now();

let trigger = null;

const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
log.init('Syrix Tickets')
log.info(`Starting up...`)


/**
 * Cuando logea
 */
client.once('ready', () => {

  log.info(`Empezando a iniciar el bot.`)
  for (const file of commands) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    log.console(`> Cargando '${config.PREFIX}${command.name}'`);
  }
  log.success(`Conectado`)
  log.success(`Logeado en ${client.user.tag}`)
  client.user.setPresence({ activity: { name: config.PLAYING, type: config.ACTIVITYTYPE, url: config.URL }, status: 'dnd'});

  const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: config.botsCanWin,
        embedColor: config.EMBEDCOLOR,
        embedColorEnd: config.EMBEDCOLOREND,
        reaction: config.EMOJIGIVEAWAYREACTION
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  if (member.id !== client.user.id){
      console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
  }
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  if (member.id !== client.user.id){
      console.log(`${member.user.tag} left giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
  }
});

  if (config.useEmbeds) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
      .setColor("#2ECC71")
      .setDescription(":white_check_mark: **Started succesfully**")
      .setFooter(`${config.NAME} | Support`);
    client.channels.cache.get(config.LOGSCHANNELID).send(embed)
  } else {
    client.channels.cache.get(config.LOGSCHANNELID).send(":white_check_mark: **Started succesfully**")
  }
  if (client.guilds.cache.get(config.GUILDID).member(client.user).hasPermission("ADMINISTRATOR", false)) {
    log.info(`Checking permissions...`);
    setTimeout(function() {
      log.success(`Required permissions have been granted\n\n`)
    }, 1250);

    if (config.useEmbeds) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setColor("#2ECC71")
        .setDescription(":white_check_mark: **Required permissions have been granted**")
        .setFooter(`${config.NAME}`);
      client.channels.cache.get(config.LOGSCHANNELID).send(embed)
    } else {
      client.channels.cache.get(config.LOGSCHANNELID).send(":white_check_mark: **Started succesfully**")
    }
  } else {
    log.error(`Required permissions have not been granted`)
    log.error(`Please give the bot the 'ADMINISTRATOR' permission\n\n`)
    if (config.useEmbeds) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setColor("#E74C3C")
        .setDescription(":x: **Required permissions have not been granted**\nPlease give the bot the `ADMINISTRATOR` permission")
        .setFooter(`${config.NAME}`);
      client.channels.cache.get(config.LOGSCHANNELID).send({
        embed
      })
    } else {
      client.channels.cache.get(config.LOGSCHANNELID).send(":white_check_mark: **Started succesfully**")
    }
  }

  /**
   * Enviar el mensaje en el canal de soporte
   */
  if (config.useEmbeds) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Support Panel`)
      .setColor(config.COLOURPANELMESSAGE)
      .addField("**Support**", `React with ${config.SUPPORTEMOJI} to open a Support ticket\n`)
      .addField("**Media**", `React with <:youtube:711296624873177149> to open a Apply for Media ticket\n`)
      .addField("**Rewards**", `React with ${config.BUGEMOJI} to open a Rewards ticket\n`)

    const PanelMessage = client.channels.cache.get(config.PANELMESSAGEID);

    PanelMessage.bulkDelete(10);

    PanelMessage.send(embed)
      .then((message) => {
        message.react(config.SUPPORTEMOJI)
        message.react(config.BUYEMOJI)
        message.react(config.BUGEMOJI)
        .catch((err) => console.error("Failed to react"))

        trigger = message.id;
      })
      .catch((err) => console.error(`Message was not send: ${err}`))
  } 
  else {
    PanelMessage.send(`React with ${config.SUPPORTEMOJI} to create a support ticket`)
      .then((message) => {
      })
      .catch((err) => console.error(`Message was not send: ${err}`));
  }

});


/**
 * Escuchando las reacciones para abrir los tickets
 */
client.on('messageReactionAdd', async (reaction, user) => {
  if (trigger != null) {
    if (reaction.message.id === trigger && user.id !== client.user.id && reaction.emoji.name === config.SUPPORTEMOJI) {
      openTicket(reaction.message, user,)
      reaction.users.remove(user);
      }
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (trigger != null) {
    if (reaction.message.id === trigger && user.id !== client.user.id && reaction.emoji.name === config.BUYEMOJI) {
      purTicket(reaction.message, user,)
      reaction.users.remove(user);
      }
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (trigger != null) {
    if (reaction.message.id === trigger && user.id !== client.user.id && reaction.emoji.name === config.BUGEMOJI) {
      bugTicket(reaction.message, user,)
      reaction.users.remove(user);
      }
    }
})

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) {
    try {
      await reaction.message.fetch();
    } catch (error) {
      console.log('mierda')
    }
  }
  console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});


/**
 * DM Log
 */
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    if (message.author.id === client.user.id) return;
    if (config.logDMs) {
      if (config.useEmbeds) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
          .setTitle("DM Logger")
          .addField("Username", message.author.tag, true)
          .addField("Message", message.content, true)
          .setFooter(`${config.NAME}`);
        client.channels.cache.get(config.LOGSCHANNELID).send(embed)
      } else {
        client.channels.cache.get(config.LOGSCHANNELID).send(`DM received from **${message.author.tag} (${message.author.id})** : \n\n\`\`\`${message.content}\`\`\``);
      }
    } else {
      return
    };

  }
  if (message.channel.bot) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${config.PREFIX})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
	   return message.channel.send(`Sorry, this command can only be used on the server.`)
  }

  if (command.args && !args.length) {
    if (config.useEmbeds) {
        const embed = new Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(`\n**Usage:** \`${config.PREFIX}${command.name} ${command.usage}\`\n`)
        return message.channel.send({embed})

    } else {
      return message.channel.send(`**Usage:** \`${config.PREFIX}${command.name} ${command.usage}\`\n`)
    }
  };


  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      if (config.useEmbeds) {
        const embed = new Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(`:x: **Please do not spam commands** (wait ${timeLeft.toFixed(1)}s)`)
        return message.channel.send({embed})
      } else {
        return message.reply(`please do not spam commands (wait ${timeLeft.toFixed(1)}s)`);
      }

    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


  try {
    command.execute(client, message, args);
    log.console(`${message.author.tag} used the '${command.name}' command`)
  } catch (error) {
    log.error(error);
    message.channel.send(`:x: **Oof!** An error occured whilst executing that command.\nThe issue has been reported.`);
    log.error(`An unknown error occured whilst executing the '${command.name}' command`);
  }

});

/**
 * Error
 */
client.on('error', error => {
  log.warn(`Potential error detected\n(likely Discord API connection issue)\n`);
  log.error(`Client error:\n${error}`);
});
client.on('warn', (e) => log.warn(`${e}`));

if(config.debugLevel == 1){ client.on('debug', (e) => log.debug(`${e}`)) };

process.on('unhandledRejection', error => {
  log.warn(`An error was not caught`);
  log.error(`Uncaught error: \n${error.stack}`);
});
process.on('beforeExit', (code) => {
  log.basic(log.colour.yellowBright(`Disconected from Discord API`));
  log.basic(`Exiting (${code})`);
});

/**
 * Gaston#1963
 */
client.login(config.TOKEN);
