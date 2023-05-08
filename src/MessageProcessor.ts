import { ICommandHandler, MessageModel } from "./types";
import { CommandNotFoundHandler } from "./CommandHandlers/CommandNotFoundHandler";
import { OpenDoorCommandHandler } from "./CommandHandlers/OpenDoorCommandHandler";


export class MessageProcessor {
    readonly availableUserIds = [1840921151];

    message: MessageModel;

    constructor(message:MessageModel) {
        this.message = message;
    }

    shouldHandleMessage():boolean{
        if(!this.availableUserIds.some((id) => this.message.from.id === id)){
            return false;
        }

        if(this.message.from.is_bot){
            return false;
        }
        
        return true;
    }

    process():string{
        if(!this.shouldHandleMessage()){
            return "Can't process this message";
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