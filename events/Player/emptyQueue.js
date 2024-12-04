const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

const messageDuration = client.config.app.messageDuration;

module.exports = (queue) => {

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate('No more songs in the queue!  <❌>')})
        .setColor('#2f3136');

        const msg = await queue.metadata.channel.send({ embeds: [embed] });

        const id = setTimeout(() => {
            msg.delete();
          }, messageDuration);
    })()
}
