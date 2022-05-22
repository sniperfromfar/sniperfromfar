
const Discord = require('discord.js');

const bruhClient = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const bruhPrefix = '-'

bruhClient.once('ready', () => {
    console.log('bruhBot is online!')
});

bruhClient.on('message', message =>{
    if(!message.content.startsWith(bruhPrefix) || message.author.bot) return;

    const bruhArgs = message.content.slice(bruhPrefix.length).split(/ +/);
    const bruhCommand = bruhArgs.shift().toLowerCase();
    const bruhVoiceChannel = message.member.voice.channel;
    const bruhGuild = bruhVoiceChannel.guild;

    if(bruhCommand === 'ping'){
        message.channel.send('pong!')
    }
    else if(bruhCommand === 'play'){
        while(bruhCommand !== 'stop'){
            const ytdl = require('ytdl-core');
            const {
	            AudioPlayerStatus,
	            StreamType,
	            createAudioPlayer,
	            createAudioResource,
	            joinVoiceChannel,
            } = require('@discordjs/voice');

            const connection = joinVoiceChannel({
	            channelId: bruhVoiceChannel.id,
	            guildId: bruhGuild.id,
                adapterCreator: bruhGuild.voiceAdapterCreator,
            });

            const stream = ytdl('youtube link', { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
                }
            }
        });
        //dont forgetr the token bruh
