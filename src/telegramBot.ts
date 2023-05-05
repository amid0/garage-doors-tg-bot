process.env.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'xxxxxx'

import {MessageModel} from './types'
import { MessageProcessor } from './MessageProcessor';

const bot = new (require('slimbot'))(process.env['TELEGRAM_BOT_TOKEN']);

// Register listeners
bot.on('message', (message:MessageModel) => {
    console.log(message);
    const result = new MessageProcessor(message).process();

    bot.sendMessage(message.chat.id, result);
});

// Call API
bot.startPolling();