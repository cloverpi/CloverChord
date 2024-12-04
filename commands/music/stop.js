const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

const messageDuration = client.config.messageDuration;

module.exports = {
    name: 'stop',
    description:('Stop the track'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) });

        queue.delete();

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: await Translate(`Music stopped, see you next time <✅>`) });

        
        
        const id = setTimeout(() => {
            inter.deleteReply();
            }, messageDuration);
        
        return inter.editReply({ embeds: [embed] });
    }
}