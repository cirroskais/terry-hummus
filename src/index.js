const fs = require("fs")

const discordEris = require("eris")
const discord = new discordEris("Bot " + process.env.DISCORD_TOKEN)

const oldgroundEris = require("../eris")
const oldground = new oldgroundEris("Bot " + process.env.OLDGROUND_TOKEN)

discord.commands = new Map()
oldground.commands = new Map()

// im gonna kms
discord.oldground = oldground
oldground.discord = discord

// this fucking sucks and i am very aware you do not need to hound me about it
for (let file of fs.readdirSync(`${__dirname}/commands`)) {
	if (!file.endsWith(".js")) continue
	if (file.endsWith(".discord.js")) discord.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
	else if (file.endsWith(".oldground.js")) oldground.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
	else {
		discord.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
		oldground.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
	}
}

for (let file of fs.readdirSync(`${__dirname}/events`)) {
	if (!file.endsWith(".js")) continue
	if (file.endsWith(".discord.js")) discord.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, discord))
	else if (file.endsWith(".oldground.js")) oldground.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, oldground))
	else {
		discord.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, discord))
		oldground.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, oldground))
	}
}

discord.connect()
oldground.connect()
