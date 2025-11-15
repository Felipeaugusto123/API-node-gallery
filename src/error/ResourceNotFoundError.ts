import { ServerError } from "./serverError";

export class ResourceNotFoundError extends ServerError{
    constructor(message = "Nao encontrado"){
        super(message,404);
    }
}