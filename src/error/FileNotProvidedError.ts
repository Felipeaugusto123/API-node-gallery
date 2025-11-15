import { ServerError } from "./serverError";

export class FileNotProvidedError extends ServerError{
    constructor(message = "Arquivo nao enviado"){
        super(message,400);
    }
}