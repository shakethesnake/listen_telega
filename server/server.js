const TelegramBot = require('node-telegram-bot-api');
const WebSocket = require('ws');
const TOKEN = '7727941794:AAFvgpE-Oums8hSeI-yIdhLcOVbowTWK7Rs';
const bot = new TelegramBot(TOKEN, { polling: {
    params: {
        timeout: 50,
    }
} });
const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', (connection) => {

    // get message from app
    connection.on('message', async (message) => {
        bot.sendMessage(connection.chatId, message);
    });

    // get message from telegram
    bot.on('message', async (msg) => {
        if (msg.text === '/wakeup') {
            connection.chatId = msg.chat.id;
            connection.send(JSON.stringify(msg));

            const firstAnswer = await bot.sendMessage(connection.chatId, 'Hello buddy!');
            setTimeout(() => {
                connection.send(JSON.stringify(firstAnswer));
            }, 100);
        } else {
            connection.send(JSON.stringify(msg));
        }
    });

    connection.on('close', () => {
        bot.removeAllListeners('message');
        bot.close();
    });
});

bot.on('polling_error', console.log);
bot.on('webhook_error', console.error);