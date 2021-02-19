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
    let command = message.content.replace("!poll", "");

    if (command.indexOf('"') < 0) {
      const help = new Discord.MessageEmbed().setColor(0xff0000)
        .setDescription(`
        **Poll usage:**
        
        **Multi answers(1-20)**
        !poll "What's Your Favorite Color?" "Blue" "Red" "Yellow"
        **Yes / No**
        !poll "Do you like Simple Poll?"
        `);

      message.channel.send(help);
      return;
    }

    let options: string[] = [];
    let tokenizedQuestion = tokenize(command);
    command = tokenizedQuestion.newText;
    let question = tokenizedQuestion.token;

    while (command.indexOf('"') >= 0) {
      let tokenizedOption = tokenize(command);
      options.push(tokenizedOption.token);
      command = tokenizedOption.newText;
    }

    const titleMessage = message.channel.send(`**📊 ${question}**`);
    let msg: Discord.Message;

    if (options.length === 0) {
      msg = await titleMessage;
      msg.react("👍");
      msg.react("👎");
    } else {
      const optionDisplay = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setDescription(
          options
            .map((option) => {
              return `📊 ${option}`;
            })
            .join("\n")
        );
      msg = await message.channel.send(optionDisplay);
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
