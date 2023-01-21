const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5878374380:AAFM_6BLaBT2vU7PKn79Yo4UBp15QhWv9fI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(
      chatId,
      'Ниже появится кнопка, заполните пожалуйста форму',
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: 'Заполнить форму',
                web_app: { url: webAppUrl + '/Modal' },
              },
            ],
          ],
        },
      }
    );
  }
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
