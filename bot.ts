import * as Discord from "discord.js";
import Dotenv from "dotenv";

Dotenv.config();

const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on("ready", () => {
  if (client.user !== null) {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("!poll");
  }
});

client.on("message", async (message) => {
  if (message.content.startsWith("!poll")) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Sick Poll")
      .setColor(0xff0000)
      .setDescription("Is Wumpus cute?");
    const msg = await message.channel.send(embed);
    msg.react("👍");
    msg.react("👎");
  }
});
