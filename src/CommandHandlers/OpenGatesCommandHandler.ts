
import { CommandArguments, ExecuteCommandResult, ICommandHandler } from "../types";

export class OpenGatesCommandHandler implements ICommandHandler {
    execute(args?: CommandArguments):ExecuteCommandResult
    {
        let result = {} as ExecuteCommandResult;

        // 
        result.isSuccess = true;

        return result;
    };
}