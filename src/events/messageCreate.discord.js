const HUMMUS_CHANNEL = process.env.HUMMUS_CHANNEL
const HUMMUS_BOT = process.env.HUMMUS_BOT
const DISCORD_CHANNEL = process.env.DISCORD_CHANNEL
const DISCORD_BOT = process.env.DISCORD_BOT

module.exports = async (client, message) => {
	const { content, author, channel, attachments } = message

	if (channel.id !== DISCORD_CHANNEL) return
	if ([HUMMUS_BOT, DISCORD_BOT].includes(author.id)) return

	const embed = {
		description: content,
		author: {
			name: `${author.username}`,
			icon_url: `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png?size=4096`,
		},
	}

	client.hummus.createMessage(HUMMUS_CHANNEL, { embed })

	if (!channel.guild) return
	if (author.bot) return
	if (content.indexOf(process.env.PREFIX) !== 0) return

	const args = content.slice(process.env.PREFIX.length).trim().split(" ")
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName)

	if (!command) return

	command(client, message, args)
}
