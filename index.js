const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`${client.user.tag} online`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ban') {

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason';

    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({
        content: 'User not found',
        ephemeral: true
      });
    }

    await member.ban({ reason });

    interaction.reply(`✅ ${user.tag} banned`);
  }
});

client.login('MTUwMDExNjM0MDkwMjcyMzc4NA.GxRYUD.KMD6O-8jdamLX8TZ1gVFiQ6XsKf00pc1m5OEI4');
