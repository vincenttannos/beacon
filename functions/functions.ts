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

const sendMessage = (
    msg: string, 
    sender: string, 
    recipient: string, 
    index: number,
    secret: number
) => {
    // Diffie Hellman Key Exchange
    const dh = crypto.createDiffieHellman(1024);
    const publicKey = dh.generateKeys('hex');
    const prime = dh.getPrime('hex');
    const generator = dh.getGenerator('hex');

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
    const encryptedText = aes256.encrypt(secret.toString(), content);

    // HMAC
    const HMAC = hmac(sha256, secret.toString(), encryptedText);

    // console.log([publicKey, prime, generator, encryptedText, HMAC])
    // HTTP/socket request with these info
}
console.log("hello")
sendMessage("hello", "me", "you", 4, 9238);


export {
    retrieveData,
    saveData,
    // signUp,
    // logIn,
    // logOut
}