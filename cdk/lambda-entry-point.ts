import {UpdateMessageModel} from '../src/types'
import { MessageProcessor } from '../src/MessageProcessor';
const botToken = process.env['TELEGRAM_BOT_TOKEN'];
const bot = new (require('slimbot'))(botToken);

export async function main(
  event: any,
): Promise<any> {
  if(botToken && event.requestContext.http.path !== ('/' + botToken)) {
    console.log('Request route not supported');

    return {
      body: JSON.stringify({message: 'Request route not supported'}),
      statusCode: 400,
    };
  }

  const updateMessage = JSON.parse(event.body) as UpdateMessageModel;
  
  console.log('Incoming message:', updateMessage);
  const result = new MessageProcessor(updateMessage.message).process();
  await bot.sendMessage(updateMessage.message.chat.id, result);
  console.log('Response: ', result);

  return {
    body: JSON.stringify({message: 'Successful lambda invocation'}),
    statusCode: 200,
  };
}