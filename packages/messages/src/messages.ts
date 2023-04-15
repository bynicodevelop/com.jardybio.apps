export interface IMessage {
    [key: string]: { 
        KEY: string;
        CONTENT: string;
    };
}

export const messages: IMessage = {
    INVALID_CREDENTIALS: {
        KEY: 'INVALID_CREDENTIALS',
        CONTENT: 'Invalid credentials',
    },
    PRODUCT_CREATED_SUCCESSFULLY: {
        KEY: 'PRODUCT_CREATED_SUCCESSFULLY',
        CONTENT: 'Product created successfully',
    },
};


export function getMessage(message: string): string {
    return messages[message].CONTENT || '';
}