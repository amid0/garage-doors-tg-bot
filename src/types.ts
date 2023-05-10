export interface FromModel{
    id:number;
    is_bot:boolean;
    first_name:string;
    last_name:string;
    username:string;
    language_code:string;
}

export interface ChatModel{
    id:number;
    first_name:string;
    last_name:string;
    username:string;
    type: 'private';
}

export interface UpdateMessageModel{
    update_id:number;
    message:MessageModel;
}

export interface MessageModel{
    message_id:number;
    date:number;
    text:string;
    from:FromModel;
    chat:ChatModel;
}

export interface CommandArguments {
    [key:string]:string;
}

export interface ExecuteCommandResult {
    isSuccess:boolean;
    failReason?:string;
}

export interface ICommandHandler{
    execute: (args?:CommandArguments) => ExecuteCommandResult;
}

