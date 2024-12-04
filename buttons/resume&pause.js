const playBuilder = require('../events/Player/embedBuilder/playBuilder');

module.exports = async ({ inter, queue }) => {
    const resumed = queue.node.resume();

    if (!resumed) {
        queue.node.pause();
    }

    const embed = await playBuilder({queue})
    return inter.update({ embeds: [embed.content], components: [embed.buttons] })
}