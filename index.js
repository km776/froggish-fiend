// go to shell and type 'kill 1' to rehost and make sure bot works again
// new goals: add more frog facts, figure out how to keep it up online consistently, and figure out when to start running it online consistenly so that i don't waste time
// go to UptimeRobot to keep it on, most of the time OR heroku OR DigitalOcean
// all commands: frog reaction, !fact, !help
// URL generator: https://discord.com/api/oauth2/authorize?client_id=1023319272266682408&permissions=274878024768&scope=bot (test to see if it expires)

// definitions
const https = require('https');
const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

// perms int: 824633773120
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// declaring intents - STRINGS
function intents(...i) {
  const clientIntents = [];
  i.forEach(intent => {
    clientIntents.push(intent);
  });
  return clientIntents;
}

// showing that the bot is logged in
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
 });

// help command
client.on("messageCreate", (message) => {
  let userName = message.author.username;
  if (message.content.startsWith("!help")) {
    const helpEmbed = new EmbedBuilder()
      .setTitle(userName + ", I'm here to help! Here's what I can do: ")
      .setColor(0x0099FF)
      .addFields(
        { name: '!help', value: "Lists all commands (not that many)."},//1 
        { name: '!fact', value: "Gives a random frog fact."},//2
        { name: 'automatic frog reaction', value: "If a user types the word 'frog', 'ribbit', or 'ribbot', it's automatically reacted to with a frog emote."},//3
      ) 
      .setTimestamp()
      .setFooter({ text: "brought to you by ribbot.", iconURL: 'https://cdn.discordapp.com/attachments/1031064989643051078/1031227116324405278/froggit.png' }); // put ribbot icon here
    message.channel.send({ embeds: [helpEmbed] });
  };
});

// frog emote reactions
client.on("messageCreate", (message) => {
  if (message.content.match(/frog/gi)) {
    message.react('🐸');
  }
  else if (message.content.match(/ribbit/gi)) {
    message.react('🐸');
  }
  else if (message.content.match(/ribbot/gi)) {
    message.react('🐸');
  }
  else {
  }
});

// frog facts command
client.on("messageCreate", (message) => {
  let userName = message.author.username;
  if (message.content.startsWith("!fact")) {

    const frogFacts = [
      "Frogs are green.",
      "Frogs are small.",
      "Frogs are cool."
    ];

    const frogFactsResponse = frogFacts[Math.floor(Math.random() * frogFacts.length)];
    
    const frogFactEmbed = new EmbedBuilder()
      .setTitle(userName + ", here's your frog fact:")
      .setColor(0x0099FF)
      .setDescription(frogFactsResponse)
      .setTimestamp()
      .setFooter({ text: "brought to you by ribbot.", iconURL: 'https://cdn.discordapp.com/attachments/1031064989643051078/1031227116324405278/froggit.png' }); // put ribbot icon here
    message.channel.send({ embeds: [frogFactEmbed] });
  };
});

// keep this part 
const mySecret = process.env['TOKEN']
console.log(mySecret);
client.login(mySecret);
// ^^