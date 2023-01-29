const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

// replace the value below with the Telegram token you receive from @BotFather
const token = "5878374380:AAFM_6BLaBT2vU7PKn79Yo4UBp15QhWv9fI";
const webAppUrl = "https://main--iridescent-axolotl-0bbd64.netlify.app/";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());
// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "Ниже появится кнопка, заполните пожалуйста форму",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Заполнить форму",
              },
            ],
          ],
        },
      }
    );
  }
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, "Received your message");
  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      console.log(data);
      await bot.sendMessage(chatId, "Ваше имя: " + data?.name);
      await bot.sendMessage(chatId, "Ваш телефон/ник: " + data?.phone);
      await bot.sendMessage(chatId, "Ваш email: " + data?.email);
    } catch (e) {
      console.log(e);
    }
  }
});

const PORT = 8000;

app.listen(PORT, () => console.log("server started on PORT " + PORT));
