const HUMMUS_CHANNEL = process.env.HUMMUS_CHANNEL
const HUMMUS_BOT = process.env.HUMMUS_BOT
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
const DISCORD_CHANNEL = process.env.DISCORD_CHANNEL
const DISCORD_BOT = process.env.DISCORD_BOT

module.exports = async (client, message) => {
	const { content, author, channel } = message

	if (channel.id !== HUMMUS_CHANNEL) return
	if ([HUMMUS_BOT, DISCORD_BOT].includes(author.id)) return

	await fetch(DISCORD_WEBHOOK, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			content,
			username: `${author.username}#${author.discriminator}`,
			avatar_url: `https://hummus-cdn.sys42.net/avatars/${author.id}/${author.avatar}.png?size=4096`,
			channel_id: DISCORD_CHANNEL,
			embeds: message.embeds,
		}),
	})

	if (!channel.guild) return
	if (author.bot) return
	if (content.indexOf(process.env.PREFIX) !== 0) return

	const args = content.slice(process.env.PREFIX.length).trim().split(" ")
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName)

	if (!command) return

	command(client, message, args)
}
