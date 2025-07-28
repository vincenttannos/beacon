
type MessageInfo = {
    message: string;
    timeSent: number;
    sender: string;
    recipient: string;
    index: number;
    failed: boolean; // will be true if recipient didn't receive the msg
    // edited: boolean;
    // editedMessages: MessageInfo[]
}

type ChatRoom = {
    messageCount: number;
    messages: MessageInfo[];
    lastMessageBy: string;
    privateKey: number;
    publicKey: number;
    mod: number;
    generator: number;
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

type ErrorObject = {
    error: string;
}

export { 
    MessageInfo, 
    ChatRoom,
    // User,
    // UserOrUndefined,
    ErrorObject,
}