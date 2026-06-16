const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = 'MTQ4MTY3ODUwNjU5NjQ5OTU3Nw.GRmNZh.4UpqjdthC0ZXImEVjHExgVgYElgBq5CMaY2mr4';
const WELCOME_CHANNEL_ID = '1514622687899549776';

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
    const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!welcomeChannel) return;

    const embed = new EmbedBuilder()
        .setColor(0x00AE86)
        .setTitle(`👋 Welcome to ${member.guild.name}!`)
        .setDescription(`Welcome <@${member.id}>!\nWe're glad to have you here.`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
        .addFields(
            { name: '📅 Member Since', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
            { name: '👤 Username', value: member.user.tag, inline: true }
        )
        .setFooter({ text: `Member #${member.guild.memberCount}` })
        .setTimestamp();

    await welcomeChannel.send({ content: `<@${member.id}>`, embeds: [embed] });
});

client.login(TOKEN);
