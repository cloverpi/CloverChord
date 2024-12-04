const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

const messageDuration = client.config.app.messageDuration;

module.exports = (queue) => {
    if (!client.config.app.extraMessages) return;
    
    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`All the songs in playlist added into the queue <✅>`)})
        .setColor('#2f3136');

        const msg = await queue.metadata.channel.send({ embeds: [embed] });

        const id = setTimeout(() => {
            msg.delete();
          }, messageDuration);
    })()
}
