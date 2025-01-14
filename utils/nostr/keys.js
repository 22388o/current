import { bech32 } from "bech32";

const utf8Encoder = new TextDecoder();

function buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}

function toByteArray(hexString) {
    var result = [];
    for (var i = 0; i < hexString.length; i += 2) {
        result.push(parseInt(hexString.substr(i, 2), 16));
    }
    return result;
}

export const decodePubkey = (pubkey) => {
    try {
        let { prefix: hrp, words: dataPart } = bech32.decode(pubkey, 2000);
        let requestByteArray = bech32.fromWords(dataPart);
        let decoded = buf2hex(requestByteArray);
        return decoded;
    } catch (err) {
        console.log(err);
    }
};

export const encodePubkey = (pubkeyInHex) => {
    try {
        let words = bech32.toWords(toByteArray(pubkeyInHex))
        const encoded = bech32.encode('npub', words)
        return encoded;
    } catch (err) {
        console.log(err);
    }
};

export const encodeSeckey = (skInKey) => {
    try {
        let words = bech32.toWords(toByteArray(skInKey))
        const encoded = bech32.encode('nsec', words)
        return encoded;
    } catch (err) {
        console.log(err);
    }
};
