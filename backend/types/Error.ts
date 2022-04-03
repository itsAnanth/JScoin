import { ErrorTypes } from "../modules/Error"

interface Error {
    type: ErrorTypes;
    message: string;
}

export type { Error };
