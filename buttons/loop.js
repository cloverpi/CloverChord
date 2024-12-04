const { QueueRepeatMode } = require('discord-player');
const playBuilder = require('../events/Player/embedBuilder/playBuilder');

const messageDuration = client.config.app.messageDuration;

module.exports = async ({ inter, queue }) => {
    const methods = ['disabled', 'track', 'queue'];

    if (queue.repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF)
    else queue.setRepeatMode(queue.repeatMode + 1)

    const embed = await playBuilder({queue})

    return inter.update({ embeds: [embed.content], components: [embed.buttons] })
}