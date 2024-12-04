module.exports = {
    app: {
        token: process.env.DISCORD_TOKEN || 'xxx',
        playing: 'by the Community ❤️',
        global: true,
        guild: process.env.GUILD_ID || 'xxx',
        extraMessages: false,
        loopMessage: false,
        messageDuration: 3000,
        embedUpdateDuration: 20000,
        lang: 'en',
        enableEmojis: true,
    },

    emojis:{
        'back': '⏪',
        'skip': '⏩',
        'ResumePause': '⏯️',
        'play': '▶️',
        'pause': '⏸️',
        'stop': '⏹️',
        'savetrack': '💾',
        'volumeUp': '🔊',
        'volumeDown': '🔉',
        'loop': '🔁',
        'loopSingle': '🔂',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        Translate_Timeout: 10000,
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
