
import { CommandArguments, ExecuteCommandResult, ICommandHandler } from "../types";

export class CommandNotFoundHandler implements ICommandHandler {
    execute(args?: CommandArguments):ExecuteCommandResult
    {
        let result = {} as ExecuteCommandResult;
        result.isSuccess = false;
        result.failReason = "Not supported command"
        
        return result;
    };
}