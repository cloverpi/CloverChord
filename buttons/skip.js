const playBuilder = require('../events/Player/embedBuilder/playBuilder');

module.exports = async ({ inter, queue }) => {
    try {
      const success = queue.node.skip()
    } catch (e) {
      console.error(e)
    }

    const embed = await playBuilder({queue})
    return inter.update({ embeds: [embed.content], components: [embed.buttons] })
}