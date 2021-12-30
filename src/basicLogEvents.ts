import * as Discord from "discord.js";
import winston from "winston";

export const basicLogEvents = (
  client: Discord.Client,
  logger: winston.Logger
): void => {
  client.on("error", (e) => {
    logger.error(e);
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
};
