"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.saveData = exports.retrieveData = void 0;
var fs = require("fs");
// import * as bcrypt from 'bcrypt';
// import TokenGenerator, { BASE62 } from 'uuid-token-generator';
// import { v4 as uuidv4, parse } from 'uuid';
// import baseX from 'base-x';
var crypto = require("crypto");
var aes256 = require("aes256");
var hmac_1 = require("@noble/hashes/hmac");
var sha2_1 = require("@noble/hashes/sha2");
var PRIME_LENGTH = 1024;
// fetches data from store
var retrieveData = function () {
    if (fs.readFileSync('data/chatRooms.json')) {
        var result = fs.readFileSync('data/chatRooms.json');
        var users = JSON.parse(result.toString());
        return users;
    }
    else {
        fs.writeFileSync('data/chatRooms.json', JSON.stringify({}));
        return {};
    }
};
exports.retrieveData = retrieveData;
// writes data to store
var saveData = function (data) {
    fs.writeFileSync('data/chatRooms.json', JSON.stringify(data, null, 2));
};
exports.saveData = saveData;
// fetches username
var getUser = function () {
    if (fs.readFileSync('data/user.json')) {
        var result = fs.readFileSync('data/user.json');
        var username = JSON.parse(result.toString()).username;
        return username;
    }
    else {
        fs.writeFileSync('data/user.json', JSON.stringify({ username: "missing" }));
        return "missing";
    }
};
exports.getUser = getUser;
// returns time to the second
var timeNow = function () {
    return Math.floor(Date.now() / 1000);
};
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
var initiate = function (msg) {
    // Diffie Hellman Key Exchange
    var dh = crypto.createDiffieHellman(1024);
    var publicKey = dh.generateKeys('hex');
    var prime = dh.getPrime('hex');
    var generator = dh.getGenerator('hex');
    // send msg in plaintext with these
};
var array = [];
var kdf = function (secret, chainKey) {
    var newKey = Buffer.from(crypto.hkdfSync('sha256', secret, chainKey, '', 32)).toString('hex');
    return newKey;
};
// sends an encrypted message with HMAC and a new public and private key
var sendMessage = function (chatRoom, msg, sender, recipient, index) {
    // Generate new public key (DH ratchet)
    if (chatRoom.lastMessageBy != sender) { // replying
        var dh = crypto.createDiffieHellman(chatRoom.prime, 'hex', chatRoom.generator, 'hex');
        dh.generateKeys();
        chatRoom.secret = dh.computeSecret(chatRoom.partnerKey, 'hex', 'hex');
        chatRoom.chainKey = chatRoom.secret;
        chatRoom.publicKey = dh.getPublicKey('hex');
        chatRoom.privateKey = dh.getPrivateKey('hex');
        chatRoom.dh = dh;
    }
    // Symmetric ratchet
    var newKey = kdf(chatRoom.secret, chatRoom.chainKey);
    chatRoom.chainKey = newKey;
    // AES Encryption
    var info = {
        timeSent: timeNow(),
        message: msg,
        sender: sender,
        recipient: recipient,
        index: index,
        failed: false
    };
    var content = JSON.stringify(info);
    var encryptedText = aes256.encrypt(newKey, content);
    // HMAC
    var HMAC = (0, hmac_1.hmac)(sha2_1.sha256, chatRoom.secret, encryptedText).toString();
    // send 
    var sendData = {
        sender: sender,
        recipient: recipient,
        publicKey: chatRoom.publicKey,
        encryptedText: encryptedText,
        HMAC: HMAC
    };
    // socket.send(JSON.stringify(sendData));
    console.log([chatRoom.publicKey, chatRoom.prime, chatRoom.generator, encryptedText, HMAC]);
    array = [chatRoom.publicKey, chatRoom.prime, chatRoom.generator, encryptedText, HMAC];
    // HTTP/socket request with these info
    chatRoom.lastMessageBy = sender;
    return sendData;
};
// sends an encrypted message with HMAC and a new public and private key
var receiveMessage = function (chatRoom, publicKey, encryptedText, HMAC, sender, recipient) {
    // Get new DH public key from partner if this is first receipt
    if (chatRoom.lastMessageBy == recipient) {
        chatRoom.partnerKey = publicKey;
        chatRoom.secret = chatRoom.dh.computeSecret(chatRoom.partnerKey, 'hex', 'hex');
        chatRoom.chainKey = chatRoom.secret;
    }
    // Symmetric ratchet using KDF
    console.log("chainKey is:", chatRoom.chainKey, "secret is: ", chatRoom.secret);
    var newKey = kdf(chatRoom.secret, chatRoom.chainKey);
    console.log(newKey, "newKey");
    chatRoom.chainKey = newKey;
    // verify HMAC
    var localHMAC = (0, hmac_1.hmac)(sha2_1.sha256, chatRoom.secret, encryptedText);
    if (HMAC !== localHMAC.toString()) {
        console.log("boo");
    }
    // AES Decryption
    var decryptedText = aes256.decrypt(newKey, encryptedText);
    var info = JSON.parse(decryptedText);
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
};
