const OLDGROUND_CHANNEL = process.env.OLDGROUND_CHANNEL

module.exports = async (client, message) => {
	const { content, author, channel, attachments } = message
	if (author.bot) return

	const embed = {
		description: content,
		author: {
			name: `${author.username}`,
			icon_url: `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png?size=4096`,
		},
	}

	client.oldground.createMessage(OLDGROUND_CHANNEL, { embed })
}
