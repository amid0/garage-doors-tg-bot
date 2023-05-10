import {MessageModel} from './types'
import { MessageProcessor } from './MessageProcessor';

const bot = new (require('slimbot'))(process.env['TELEGRAM_BOT_TOKEN']);

export function setUpAndRunBot() {
    // Register listeners
    bot.on('message', (message:MessageModel) => {
        console.log('Incoming message:');
        console.log(message);
        const result = new MessageProcessor(message).process();
        
        bot.sendMessage(message.chat.id, result);
        console.log('Response:');
        console.log(result);
    });
    
    // Call API
    bot.startPolling();
    
    console.log("Bot started");
}
