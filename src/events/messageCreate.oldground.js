const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK
const DISCORD_CHANNEL = process.env.DISCORD_CHANNEL

module.exports = async (client, message) => {
	const { content, author, channel } = message
	if (author.bot) return

	await fetch(DISCORD_WEBHOOK, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			content,
			username: `${author.username}#${author.discriminator}`,
			avatar_url: `https://oldground-cdn.haydar.dev/avatars/${author.id}/${author.avatar}.png?size=4096`,
			channel_id: DISCORD_CHANNEL,
		}),
	})
}
