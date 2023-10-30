const fs = require("fs")

const discordEris = require("eris")
const discord = new discordEris("Bot " + process.env.DISCORD_TOKEN)

const hummusEris = require("../eris")
const hummus = new hummusEris("Bot " + process.env.HUMMUS_TOKEN)

discord.commands = new Map()
hummus.commands = new Map()

// im gonna kms
discord.hummus = hummus
hummus.discord = discord

// this fucking sucks and i am very aware you do not need to hound me about it
for (let file of fs.readdirSync(`${__dirname}/commands`)) {
	if (!file.endsWith(".js")) continue
	if (file.endsWith(".discord.js")) discord.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
	else if (file.endsWith(".hummus.js")) hummus.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
	else {
		discord.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
		hummus.commands.set(file.split(".")[0], require(`${__dirname}/commands/${file}`))
	}
}

for (let file of fs.readdirSync(`${__dirname}/events`)) {
	if (!file.endsWith(".js")) continue
	if (file.endsWith(".discord.js")) discord.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, discord))
	else if (file.endsWith(".hummus.js")) hummus.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, hummus))
	else {
		discord.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, discord))
		hummus.on(file.split(".")[0], require(`${__dirname}/events/${file}`).bind(null, hummus))
	}
}

discord.connect()
hummus.connect()
