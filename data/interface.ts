import { DiffieHellman } from "crypto";

export type MessageInfo = {
    message: string;
    timeSent: number;
    sender: string;
    recipient: string;
    index: number;
    failed: boolean; // will be true if recipient didn't receive the msg
    // edited: boolean;
    // editedMessages: MessageInfo[]
}

export type ChatRoom = {
    messageCount: number;
    messages: MessageInfo[];
    lastMessageBy: string;
    privateKey: string;
    publicKey: string;
    partnerKey: string;
    prime: string;
    generator: string;
    secret: string;
    chainKey: string;
    dh: DiffieHellman;
}

// type User = {
//     username: string;
//     passwordHash: string;
//     salt: string;
//     loginAttempts: number;
//     lastLogin: number;
//     nextLoginAvailable: number;
//     messageQueue: MessageInfo[];
//     token: string;
//     sessionExpiry: number;
// }

// type UserOrUndefined = User | undefined;

export type ErrorObject = {
    error: string;
}

// export { 
//     MessageInfo, 
//     ChatRoom,
//     // User,
//     // UserOrUndefined,
//     ErrorObject,
// }