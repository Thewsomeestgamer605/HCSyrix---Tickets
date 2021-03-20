const Discord = require('discord.js');
const config = require('../config.json');

/**
 * Soporte ticket
 */
const openTicket = async function (message, user) {
    let id = user.id.toString().substr(0, 4) + user.discriminator;
    let chan = `ticket-${user.username}`.toLowerCase();

    if (message.guild.channels.cache.find(channel => channel.name === chan)) {
        if (config.useEmbeds) {
            const err1 = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`:x: You already have an open ticket.`)
                .setFooter(`${config.NAME}`)
                .setTimestamp()
            return message.channel.send(err1).then((message) => {
                setTimeout(() => {
                    message.delete();
                }, 5000);
            });
        } else {
            return message.channel.send(`:x: You already have an open ticket.`)
        }

    };

    const ticketCreated = await message.guild.channels.create(chan, {
        type: 'text',
        topic: `${user} | Please be patient and do not tag the staff.`,
        parent: config.TICKETSCATEGORYID1, 
        permissionOverwrites: [
            {
                allow: 'VIEW_CHANNEL',
                id: user.id
            },
            {
                deny: 'VIEW_CHANNEL',
                id: message.guild.id
            },
            {
                allow: 'VIEW_CHANNEL',
                id: config.SUPORTROLEID
            }
        ]
      });

        if (config.tagHereOnly) {
            await ticketCreated.send(`@here, ${user} Has created a new ticket.\n`);
        } else {
            await ticketCreated.send(`<@&${config.SUPORTROLEID}>, <@&${config.ADMINROLEID}>, ${user} Has created a new ticket.\n`);
        };

        const embedTicketcreated = new Discord.MessageEmbed()
        .setTitle('**Syrix Tickets (Help)**')
        .setDescription(`Please explain your problem so the staff team can help you\nAlso be patient and don't tag the staff.`)
        .addField('Author', user)
        .setThumbnail('')
        .setFooter('You can close this ticket by executing !close')
        .setTimestamp()
        .setColor("BLUE")
        ticketCreated.send(embedTicketcreated)        

        if (message.guild.channels.cache.find(channel => channel.name === chan)) {
            if (config.useEmbeds) {
                const err1 = new Discord.MessageEmbed()
                    .setColor("#2ECC71")
                    .setTitle("Tickets")
                    .setDescription(`:white_check_mark: Your ticket has been created in ${ticketCreated}`)
                    .setTimestamp()
                    .setFooter(`${config.NAME}`)
                return message.channel.send(err1).then((message) => {
                    setTimeout(() => {
                        message.delete();
                    }, 5000);
                });
            }
        }

            }

/**
 * Compras ticket
 */

            const purTicket = async function (message, user) {
                let id = user.id.toString().substr(0, 4) + user.discriminator;
                let chan = `ticket-Media-${user.username}`.toLowerCase();
            
                if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                    if (config.useEmbeds) {
                        const err1 = new Discord.MessageEmbed()
                            .setColor("#E74C3C")
                            .setDescription(`:x: You already have an open ticket.`)
                            .setFooter(`${config.NAME}`)
                            .setTimestamp()
                        return message.channel.send(err1).then((message) => {
                            setTimeout(() => {
                                message.delete();
                            }, 5000);
                        });
                    } else {
                        return message.channel.send(`:x: You already have an open ticket.`)
                    }
            
                };
            
                const ticketCreated = await message.guild.channels.create(chan, {
                    type: 'text',
                    topic: `${user} | Please be patient and do not tag the staff.`,
                    parent: config.TICKETSCATEGORYID2, 
                    permissionOverwrites: [
                        {
                            allow: 'VIEW_CHANNEL',
                            id: user.id
                        },
                        {
                            deny: 'VIEW_CHANNEL',
                            id: message.guild.id
                        },
                        {
                            allow: 'VIEW_CHANNEL',
                            id: config.OWNERID
                        }
                    ]
                  });
            
                    if (config.tagHereOnly) {
                        await ticketCreated.send(`@here, ${user} Has created a new ticket.\n`);
                    } else {
                        await ticketCreated.send(`<@&${config.OWNERID}>, ${user} Has created a new ticket.\n`);
                    };
            
                    const embedTicketcreated = new Discord.MessageEmbed()
                    .setTitle('**Syrix Tickets (Media)**')
                    .setDescription(`Please send us your channel how many subcribers how many views per video do you get and why do you want to become Media at HCSyrix As staff will soon look at it Please don't @ Any staff`)
                    .addField('Author', user)
                    .setThumbnail('')
                    .setFooter('You can close this ticket by executing !close')
                    .setTimestamp()
                    .setColor("BLUE")
                    ticketCreated.send(embedTicketcreated)        
            
                    if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                        if (config.useEmbeds) {
                            const err1 = new Discord.MessageEmbed()
                                .setColor("#2ECC71")
                                .setTitle("Tickets")
                                .setDescription(`:white_check_mark: Your ticket has been created in ${ticketCreated}`)
                                .setTimestamp()
                                .setFooter(`${config.NAME}`)
                            return message.channel.send(err1).then((message) => {
                                setTimeout(() => {
                                    message.delete();
                                }, 5000);
                            });
                        }
                    }
            
                        }    

/**
 * Rewards ticket
 */                    
                        const bugTicket = async function (message, user) {
                            let id = user.id.toString().substr(0, 4) + user.discriminator;
                            let chan = `ticket-rewards-${user.username}`.toLowerCase();
                        
                            if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                                if (config.useEmbeds) {
                                    const err1 = new Discord.MessageEmbed()
                                        .setColor("#E74C3C")
                                        .setDescription(`:x: You already have an open ticket.`)
                                        .setFooter(`${config.NAME}`)
                                        .setTimestamp()
                                    return message.channel.send(err1).then((message) => {
                                        setTimeout(() => {
                                            message.delete();
                                        }, 5000);
                                    });
                                } else {
                                    return message.channel.send(`:x: You already have an open ticket.`)
                                }
                        
                            };
                        
                            const ticketCreated = await message.guild.channels.create(chan, {
                                type: 'text',
                                topic: `${user} | Please be patient and do not tag the staff.`,
                                parent: config.TICKETSCATEGORYID3, 
                                permissionOverwrites: [
                                    {
                                        allow: 'VIEW_CHANNEL',
                                        id: user.id
                                    },
                                    {
                                        deny: 'VIEW_CHANNEL',
                                        id: message.guild.id
                                    },
                                    {
                                        allow: 'VIEW_CHANNEL',
                                        id: config.SUPORTROLEID
                                    }
                                ]
                              });
                        
                                if (config.tagHereOnly) {
                                    await ticketCreated.send(`@here, ${user} Has created a new ticket.\n`);
                                } else {
                                    await ticketCreated.send(`<@&${config.SUPORTROLEID}>, <@&${config.ADMINROLEID}>, ${user} Has created a new ticket.\n`);
                                };
                        
                                const embedTicketcreated = new Discord.MessageEmbed()
                                .setTitle('**Syrix Tickets (Rewards)**')
                                .setDescription(`Please explain what reward you want so the staff can help you.\nAlso be patient and don't tag the staff.`)
                                .addField('Author', user)
                                .setThumbnail('')
                                .setFooter('You can close this ticket by executing !close')
                                .setTimestamp()
                                .setColor("BLUE")
                                ticketCreated.send(embedTicketcreated)        
                        
                                if (message.guild.channels.cache.find(channel => channel.name === chan)) {
                                    if (config.useEmbeds) {
                                        const err1 = new Discord.MessageEmbed()
                                            .setColor("#2ECC71")
                                            .setTitle("Tickets")
                                            .setDescription(`:white_check_mark: Your ticket has been created in ${ticketCreated}`)
                                            .setTimestamp()
                                            .setFooter(`${config.NAME}`)
                                        return message.channel.send(err1).then((message) => {
                                            setTimeout(() => {
                                                message.delete();
                                            }, 5000);
                                        });
                                    }
                                }
                        
                                    }              
    
/**
 * Close a ticket
 */
const closeTicket = function (message) {
    if(!message.channel.name.startsWith('ticket-')) {
        if(config.useEmbeds) {
            const notTicket = new Discord.MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`:x: **This command can only be used within a ticket channel**`)
            return message.channel.send(notTicket);
        } else {
            return message.channel.send(`:x: **This command can only be used within a ticket channel**`)
        }
    } 
    else {
        try {
            message.channel.delete()
        } catch(error) {
            log.error(log.colour.red(error));
        }
    }
}

module.exports = {
    openTicket,
    purTicket,
    bugTicket,
    closeTicket
}