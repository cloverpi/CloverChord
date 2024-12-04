const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

const messageDuration = client.config.app.messageDuration;

module.exports = (queue) => {
    if (queue.metadata.lyricsThread) {
        queue.metadata.lyricsThread.delete();
        queue.setMetadata({
            channel: queue.metadata.channel
        });
    }

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Nobody is in the voice channel, leaving the voice channel!  <❌>`)})
        .setColor('#2f3136');

        const msg = await queue.metadata.channel.send({ embeds: [embed] });

        const id = setTimeout(() => {
            msg.delete();
          }, messageDuration);

    })()
}
