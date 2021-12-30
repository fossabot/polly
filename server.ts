import * as Discord from "discord.js";
import * as Dotenv from "dotenv";
import { optionEmojis } from "./optionEmojis";
import { logger } from "./logger";

//SETTINGS
const embedColor: Discord.ColorResolvable = 0x3b88c3;
const command = "!poll";

Dotenv.config();

const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on("ready", () => {
  if (client.user !== null) {
    logger.info(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(command);
  }
});

client.on("error", (e) => {
  logger.error(e);
});

client.on("rateLimit", (e) => {
  logger.warn(e);
});

client.on("disconnect", () => {
  logger.info("Disconnected from server!");
});

client.on("warn", (e) => {
  logger.warn(e);
});

client.on("guildBanAdd", (guild, user) => {
  logger.warn(`Banned by ${user} on server ${guild}`);
});

client.on("message", async (message) => {
  logger.info(`Message received: ${message}`);
  if (message.content.startsWith(command)) {
    let instruction = message.content.replace(command, "");

    //Send help message if no question is given
    if (instruction.indexOf('"') < 0) {
      const help = createEmbed(`
        **Poll usage:**
      
        **Multi answers(1-${optionEmojis.length})**
        ${command} "What's Your Favorite Color?" "Blue" "Red" "Yellow"
        **Yes / No**
        ${command} "Do you like Poll?"
      `);

      message.channel.send(help);
      return;
    }

    let options: string[] = [];

    //Tokenize question
    let tokenizedQuestion = tokenize(instruction);
    instruction = tokenizedQuestion.newText;
    let question = tokenizedQuestion.token;

    //Tokenize all options
    while (instruction.indexOf('"') >= 0) {
      let tokenizedOption = tokenize(instruction);
      options.push(tokenizedOption.token);
      instruction = tokenizedOption.newText;
    }

    //Send pleasant surprise if options are more than possible
    if (options.length > optionEmojis.length) {
      message.channel.send(
        "https://media.giphy.com/media/Wrh8aL75aj4uZwuqta/giphy.gif"
      );
      return;
    }

    const titleMessage = message.channel.send(`**📊 ${question}**`);
    let msg: Discord.Message;

    //Send question as message only when no option is given
    if (options.length === 0) {
      msg = await titleMessage;
      msg.react("👍");
      msg.react("👎");
    }
    //If options are given display them in embed
    else if (options.length <= optionEmojis.length) {
      let embedOptions: string[] = [];
      for (let i = 0; i < options.length; i++) {
        embedOptions.push(`${optionEmojis[i]} ${options[i]}`);
      }

      const optionDisplay = createEmbed(embedOptions.join("\n"));
      msg = await message.channel.send(optionDisplay);

      for (let i = 0; i < options.length; i++) {
        msg.react(optionEmojis[i]);
      }
    }
  }
});

function tokenize(text: string) {
  let start = text.indexOf('"');
  let end = text.indexOf('"', start + 1);
  let token = text.substring(start + 1, end);
  let newText = text.replace(`"${token}"`, "");

  return { token, newText };
}

function createEmbed(description: string) {
  return new Discord.MessageEmbed()
    .setColor(embedColor)
    .setDescription(description);
}
