const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

const maxProgressPips = 15
const emojis = client.config.emojis;

module.exports = async ({ queue }) => {
    const { currentTrack: track, node, channel: voiceChannel, repeatMode, history } = queue;
    const { title, author, duration, url, requestedBy: {globalName, username, id: requesterId}, views, description } = track;
    const channel = queue.metadata.channel;
    const paused = node.isPaused()
  
    let requesterDisplayName = ''
    if (requesterId != null) {
      try {
        const {nickname, user} = await channel.guild.members.fetch(requesterId)
        requesterDisplayName =  nickname || 
                                user.globalName || 
                                user.username ||
                                globalName ||
                                username ||
                                'Unknown'
      } catch (e){
        console.error(e)
      }
    } else {
      requesterDisplayName =  globalName ||
                              username ||
                              'Unknown'
    }
  
    const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setURL(url)
        .addFields(
          {
            name: " ",
            value: "**Artist**\n**Duration**\n**Plays**",
            inline: true
          },
          {
            name: " ",
            value: `${author}\n${duration}\n${views.toLocaleString()}`,
            inline: true
          },
          {
            name: "Description",
            value: `${description}`,
            inline: false
          },
          {
            name: "Progress",
            value: `${'o'.repeat(Math.round((node.playbackTime / node.totalDuration) * maxProgressPips)).padEnd(maxProgressPips,'x').replaceAll('o','🟩').replaceAll('x','◽')}`,
            inline: false
          }
        )
        .setThumbnail(track.thumbnail)
        .setFooter({
          text: `Played By: ${requesterDisplayName} - Vibin' in ${voiceChannel.name} 🎧`.padEnd(131) + '\u200B',
          iconURL: "https://i.imgur.com/9ZhnBT4.gif",
        })
        
      const back = new ButtonBuilder()
        .setEmoji(emojis.back)
        .setCustomId('back')
        .setStyle('Primary')
        .setDisabled(!history.previousTrack);
  
      const skip = new ButtonBuilder()
        .setEmoji(emojis.skip)
        .setCustomId('skip')
        .setStyle('Primary')
        .setDisabled(!history.nextTrack);
  
      const resumepause = new ButtonBuilder()
        .setEmoji(paused == true ? emojis.pause : emojis.play)
        .setCustomId('resume&pause')
        .setStyle(paused == true ? 'Secondary' : 'Success');
  
      const loop = new ButtonBuilder()
        .setEmoji(repeatMode == 1 ? emojis.loopSingle : emojis.loop)
        .setCustomId('loop')
        .setStyle(repeatMode ? 'Success' : 'Secondary');
  
      const stop = new ButtonBuilder()
        .setEmoji(emojis.stop)
        .setCustomId('stop')
        .setStyle('Danger');
  
      const row1 = new ActionRowBuilder().addComponents(
        back,
        skip,
        resumepause,
        loop,
        stop,
      );
  
      return {content: embed, buttons: row1}
}