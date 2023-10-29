module.exports = async (client) => {
	client.shards.every((shard) => shard.editStatus("online"))
}
