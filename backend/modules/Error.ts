import type { Error as IE } from '../types/Error';

interface Error extends IE { };

enum ErrorTypes {
    INVALID_PUBLIC_KEY,
    INVALID_PRIVATE_KEY,
    INSUFFICIENT_BALANCE
}

class Error {
    constructor(type: ErrorTypes, message: string = '') {
        this.type = type
        this.message = message;
    }
}

export default Error;
export { Error, ErrorTypes };
