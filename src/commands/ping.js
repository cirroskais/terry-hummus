module.exports = async (client, message, args) => {
	let lines = ""
	client.shards.every((shard) => (lines += `Shard ${shard.id}: ${shard.latency}ms\n`))
	message.channel.createMessage(lines)
}
