const playBuilder = require('./embedBuilder/playBuilder')

const messages = {}
const timers = {}
const messagesTimeout = 1800000 //30 mins
const embedUpdateDuration = client.config.app.embedUpdateDuration;

module.exports = (queue, track, reTrigger) => {
  (async () => {
    const { node } = queue;
    const channel = queue.metadata.channel;

    if ( !node.isPlaying() && !node.isPaused() ) {
      try {
        if (timers[channel.id]) { 
          clearInterval(timers[channel.id])
          delete timers[channel.id]
        }
        if (messages[channel.id]) {
          const oldmsg = messages[channel.id]
          delete messages[channel.id]
          oldmsg.delete()
        }
      } catch (error) {
        console.error(error)
      }
      return
    }

    const embed = await playBuilder({queue})

    try {
      if( messages[channel.id] == null ) {
        const msg = await channel.send({ embeds: [embed.content], components: [embed.buttons] });
        messages[msg.channelId] = msg
        if (!timers[msg.channelId]) {
          timers[msg.channelId] = setInterval(() => {
                                    queue.player.events.emit("playerStart", queue, queue.currentTrack)
                                  }, embedUpdateDuration);
        }
      } else {
        const oldmsg = messages[channel.id]
        const curTime = Date.now()
        if ( (curTime - oldmsg.createdTimestamp) >= messagesTimeout) {
          oldmsg.delete()
          const msg = await channel.send({ embeds: [embed.content], components: [embed.buttons] });
          messages[msg.channelId] = msg
        } else {
          const msg = await oldmsg.edit({ embeds: [embed.content], components: [embed.buttons] })
          messages[channel.id] = msg
        }
      }
    } catch (e) {
      delete messages[channel.id]
      console.error(e)
      if (!reTrigger) { 
        console.log('Attempting to retrigger event\nLikely due to missing message or permissions\n  This will not be repeated.')
        queue.player.events.emit("playerStart", queue, track, true) 
      }
    }
  })();
};
