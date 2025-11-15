import { ServerError } from "./serverError";

export class RequiredParamsError extends ServerError{
    constructor(message = "Erro nos parametros"){
        super(message,400);
    }
}