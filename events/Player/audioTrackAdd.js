const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

const messageDuration = client.config.app.messageDuration;

module.exports = (queue, track) => {
    if (!client.config.app.extraMessages) return;

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Track <${track.title}> added in the queue <✅>`), iconURL: track.thumbnail })
        .setColor('#2f3136');

        const msg = await queue.metadata.channel.send({ embeds: [embed] });

        const id = setTimeout(() => {
            msg.delete();
          }, messageDuration);
    })()
}