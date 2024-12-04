const playBuilder = require('../events/Player/embedBuilder/playBuilder');

module.exports = async ({ inter, queue }) => {
    const embed = await playBuilder({queue})
    queue.delete();
    return inter.update({ embeds: [embed.content], components: [embed.buttons] })
}