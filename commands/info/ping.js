module.exports = {
    name: "ping",
	aliases: ["latency"],
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pingeando....`);

        msg.edit(`<a:api:857178138765164594>
        La latencia del api es: ${Math.round(client.ws.ping)}ms`);
    }
}
