const TelegramBot = require('node-telegram-bot-api');
const WebSocket = require('ws');
const TOKEN = `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`;
const bot = new TelegramBot(TOKEN, { polling: {
    params: {
        timeout: 100,
        interval: 200,
    }
} });
const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', (connection) => {
    console.log('new connection');
    // get message from app
    connection.on('message', async (data) => {
        console.log(connection.chatId, data.toString());
        const resp = await bot.sendMessage(connection.chatId, data.toString());

        setTimeout(() => {
            connection.send(JSON.stringify(resp));
        }, 100);
    });
    
    // get message from telegram
    bot.on('message', async (msg) => {
        console.log(msg.text)
        if (msg.text === '/wakeup') {
            console.log(msg.chat.id);
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
