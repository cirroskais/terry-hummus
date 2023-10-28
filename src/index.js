const Eris = require("../eris")
const client = new Eris("Bot " + process.env.TOKEN)

client.on("ready", () => {
	client.shards.every((shard) => shard.editStatus("online"))
})

client.on("messageCreate", (message) => {
	if (message.content == "!ping") {
		let lines = ""
		client.shards.every((shard) => (lines += `Shard ${shard.id}: ${shard.latency}ms\n`))
		message.channel.createMessage(lines)
	}
})

// client.on("rawWS", (packet, id) => {
// 	console.log(packet, id)
// })

client.on("warn", (warn) => {
	console.log(warn)
})

client.on("error", (error) => {
	console.log(error)
})

client.connect()
