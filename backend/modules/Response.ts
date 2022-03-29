import statusCodes from "./statusCodes";

abstract class IResponse {
    static status: typeof statusCodes;
}

type responsePayload = { success?: boolean, message: string, code?: number };

class Response extends IResponse {
    static error({ message, code }: responsePayload) {
        const payload: responsePayload = { success: false, message: message };
        if (code) payload.code = code
        return JSON.stringify(payload);
    }

    static success({ message, code }: { message: string, code?: number }) {
        const payload: responsePayload = { success: true, message: message };
        if (code) payload.code = code
        return JSON.stringify(payload);
    }
}

Response.status = statusCodes;


export default Response;