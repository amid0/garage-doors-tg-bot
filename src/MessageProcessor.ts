import { ICommandHandler, MessageModel } from "./types";
import { CommandNotFoundHandler } from "./CommandHandlers/CommandNotFoundHandler";
import { OpenDoorCommandHandler } from "./CommandHandlers/OpenDoorCommandHandler";

export class MessageProcessor {
    readonly availableUserIds = [1840921151];

    message: MessageModel;

    constructor(message:MessageModel) {
        this.message = message;
    }

    validateMessage():string{
        if(!this.availableUserIds.some((id) => this.message.from.id === id)){
            return `Unknown user id. MessageUserId:${this.message.from.id}`;
        }

        if(this.message.from.is_bot){
            return 'Messages from bots cannot be handled';
        }
        
        // validate message timestamp. prevent handling queued old messages 
        const now = new Date().getTime();
        const messageDate = this.message.date * 1000;

        if((now - messageDate) >= 1000) {
            return `Old messages cannot be handled. now:${now} msgDate:${messageDate} diff:${now - messageDate}ms`;
        }

        return '';
    }

    process():string{
        const validationResult = this.validateMessage();
        if(validationResult){
            return validationResult;
        }

        let handler:ICommandHandler;

        switch (this.message.text) {
            case '/open':
                handler = new OpenDoorCommandHandler();
                break;
            default:
                handler = new CommandNotFoundHandler();
                break;
        }

        const result = handler.execute();

        return result.isSuccess ? "Done" : result.failReason!;
    }
}