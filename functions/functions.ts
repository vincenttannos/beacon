import * as fs from 'fs';
// import * as bcrypt from 'bcrypt';
// import TokenGenerator, { BASE62 } from 'uuid-token-generator';
// import { v4 as uuidv4, parse } from 'uuid';
// import baseX from 'base-x';
import * as crypto from 'crypto';
import * as aes256 from 'aes256';
import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha2';
import { 
//   User,
//   UserOrUndefined,
  MessageInfo,
  ChatRoom,
  ErrorObject,
} from '../data/interface';

const PRIME_LENGTH = 1024;

// fetches data from store
const retrieveData = (): ChatRoom[] => {
    if (fs.readFileSync('data/chatRooms.json')) {
        const result = fs.readFileSync('data/chatRooms.json');
        const users: ChatRoom[] = JSON.parse(result.toString());
        return users;
    } else {
        fs.writeFileSync('data/chatRooms.json', JSON.stringify([]));
        return [];
    }
}

// writes data to store
const saveData = (data: ChatRoom[]) => {
    fs.writeFileSync('data/chatRooms.json', JSON.stringify(data, null, 2));
}

// returns time to the second
const timeNow = (): number => {
    return Math.floor(Date.now() / 1000);
}

// // finds a user by their username
// const findUsername = (data: User[], username: string): UserOrUndefined => {
//     return data.find((x) => x.username === username);
// }

// // generates a token
// const generateToken = () => {
//     const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const base62 = baseX(BASE62_ALPHABET);

//     const uuid = uuidv4();
//     const buffer = Buffer.from(parse(uuid));
//     return base62.encode(buffer);
// }

// // signs a new user up
// const signUp = (data: User[], username: string, password: string) => {
//     if (findUsername(data, username)) {
//         return { error: "username already taken" };
//     }

//     if (password.length < 12) {
//         return { error: "password is too short" };
//     } else if (
//         !password.match(/[a-z]/) ||
//         !password.match(/[A-Z]/) ||
//         !password.match(/[0-9]/) ||
//         password.match(/^[a-z][A-Z][a-z]$/)
//     ) {
//         return { error: "password should have uppercase and lowercase letters, symbols and numbers"};
//     }

//     const newToken = generateToken();

//     bcrypt.genSalt(12, function(err, salt) {
//         bcrypt.hash(password, salt, function(err, hash) {
//             const time = timeNow();
//             const newUser: User = {
//                 username: username,
//                 passwordHash: hash,
//                 salt: salt,
//                 loginAttempts: 0,
//                 lastLogin: time,
//                 nextLoginAvailable: time,
//                 messageQueue: [],
//                 token: newToken,
//                 sessionExpiry: time + 3600, // expire in an hour
//             };
//             data.push(newUser);
//             console.log(data);
//             saveData(data);
//         });
//     });
    
//     return { token: newToken };
// }

// // logs a user in
// const logIn = (data: User[], username: string, password: string) => {
//     const user = findUsername(data, username);
//     if (!user) {
//         return { error: "username not found" };
//     } else if (user.nextLoginAvailable > timeNow()) {
//         return { error: "timed out: try again later" };
//     } 

//     let hashResult = bcrypt.hashSync(password, user.salt);

//     if (user.passwordHash !== hashResult) {
//         user.loginAttempts++;
//         if (user.loginAttempts > 3) {
//             // However many failed logins adds to the timer by that amount of minutes
//             user.nextLoginAvailable += user.loginAttempts * 60;
//         }
//         saveData(data);
//         return { error: "incorrect password" };
//     } else {
//         const newToken = generateToken();
//         user.token = newToken;
//         user.lastLogin = timeNow();
//         user.loginAttempts = 0;
//         user.sessionExpiry = user.lastLogin += 3600;
//         saveData(data);
//         return { token: newToken };
//     }
// }

// // logs a user out
// const logOut = (data: User[], username: string) => {
//     const user = findUsername(data, username);
//     if (!user) {
//         return { error: "username not found" };
//     } else if (user.token === "0") {
//         return { error: "already logged out" };
//     }

//     user.token = "0";
//     user.sessionExpiry = timeNow();
//     saveData(data);
//     return {};
// }

// // sends a message
// const sendMessage = (
//     data: User[], 
//     sender: string,
//     recipient: string, 
//     messageInformation: string,
//     mod: number,
//     generator: number,
//     publicKey: number,
//     HMAC: string
// ) => {
//     // 
// }

// sends first message (no HMAC or encryption) to initiate a conversation
// first message will be index 1 - start of convo
const initiate = (msg: string) => {
    // Diffie Hellman Key Exchange
    const dh = crypto.createDiffieHellman(1024);
    const publicKey = dh.generateKeys('hex');
    const prime = dh.getPrime('hex');
    const generator = dh.getGenerator('hex');

    // send msg in plaintext with these
}

let array: string[] = []
// const socket = new WebSocket('url', 'protocols');

type DHInfo = {
    dh: crypto.DiffieHellman;
}

const kdf = (secret: string, chainKey: string) => {
    let newKey = Buffer.from(crypto.hkdfSync('sha256', secret, chainKey, '', 32)).toString('hex');
    return newKey;
}

// sends an encrypted message with HMAC and a new public and private key
const sendMessage = (
    chatRoom: ChatRoom,
    msg: string, 
    sender: string, 
    recipient: string, 
    index: number,
) => {
    // Generate new public key (DH ratchet)
    if (chatRoom.lastMessageBy != sender) { // replying
        const dh = crypto.createDiffieHellman(chatRoom.prime, 'hex', chatRoom.generator, 'hex');
        dh.generateKeys();
        chatRoom.secret = dh.computeSecret(chatRoom.partnerKey, 'hex', 'hex');
        chatRoom.chainKey = chatRoom.secret;
        chatRoom.publicKey = dh.getPublicKey('hex');
        chatRoom.privateKey = dh.getPrivateKey('hex');
        chatRoom.dh = dh;
    }

    // Symmetric ratchet
    const newKey = kdf(chatRoom.secret, chatRoom.chainKey);
    chatRoom.chainKey = newKey;

    // AES Encryption
    const info: MessageInfo = {
        timeSent: timeNow(),
        message: msg,
        sender: sender,
        recipient: recipient,
        index: index,
        failed: false
    }
    const content = JSON.stringify(info);
    const encryptedText = aes256.encrypt(newKey, content);

    // HMAC
    const HMAC = hmac(sha256, chatRoom.secret, encryptedText).toString();

    // send 
    const sendData = {
        sender: sender,
        recipient: recipient,
        publicKey: chatRoom.publicKey,
        encryptedText: encryptedText,
        HMAC: HMAC
    }
    // socket.send(JSON.stringify(sendData));

    console.log([chatRoom.publicKey, chatRoom.prime, chatRoom.generator, encryptedText, HMAC])
    array = [chatRoom.publicKey, chatRoom.prime, chatRoom.generator, encryptedText, HMAC]
    
    // HTTP/socket request with these info
    chatRoom.lastMessageBy = sender;
    return sendData
}



// sends an encrypted message with HMAC and a new public and private key
const receiveMessage = (
    chatRoom: ChatRoom,
    publicKey: string, 
    encryptedText: string,
    HMAC: string,
    sender: string,
    recipient: string
) => {
    // Get new DH public key from partner if this is first receipt
    if (chatRoom.lastMessageBy == recipient) {
        chatRoom.partnerKey = publicKey;
        chatRoom.secret = chatRoom.dh.computeSecret(chatRoom.partnerKey, 'hex', 'hex');
        chatRoom.chainKey = chatRoom.secret;
    }

    // Symmetric ratchet using KDF
    console.log("chainKey is:", chatRoom.chainKey, "secret is: ", chatRoom.secret)
    const newKey = kdf(chatRoom.secret, chatRoom.chainKey);
    console.log(newKey, "newKey")
    chatRoom.chainKey = newKey;

    // verify HMAC
    const localHMAC = hmac(sha256, chatRoom.secret, encryptedText);
    if (HMAC !== localHMAC.toString()) {
        console.log("boo");
    }

    // AES Decryption
    const decryptedText = aes256.decrypt(newKey, encryptedText);;
    const info: MessageInfo = JSON.parse(decryptedText);
    // {
    //     timeSent: timeNow(),
    //     message: msg,
    //     sender: sender,
    //     recipient: recipient,
    //     index: index,
    //     failed: false
    // }

    chatRoom.lastMessageBy = sender;

    // console.log(info)
}


export {
    retrieveData,
    saveData,
    // signUp,
    // logIn,
    // logOut
}