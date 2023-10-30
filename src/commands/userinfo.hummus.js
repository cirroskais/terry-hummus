module.exports = async (client, message, args) => {
	const { author, member } = message

	const dateOptions = { year: "numeric", month: "short", day: "numeric", weekday: "short" }

	const createdDate = new Date(author.createdAt)
	const created = createdDate.toLocaleTimeString("en-US", dateOptions)

	const joinedDate = new Date(member.joinedAt)
	const joined = joinedDate.toLocaleTimeString("en-US", dateOptions)

	const embed = {
		author: {
			name: `${author.username}#${author.discriminator}`,
			icon_url: `https://hummus-cdn.sys42.net/avatars/${author.id}/${author.avatar}.png?size=4096`,
		},
		description: `<@${author.id}>`,
		fields: [
			{ name: "Joined", value: joined, inline: true },
			{ name: "Registered", value: created, inline: true },
			{ name: "Roles", value: member.roles.map((id) => `<@&${id}>`).join(" "), inline: false },
		],
	}

	message.channel.createMessage({ embed })
}
