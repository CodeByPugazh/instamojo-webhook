const crypto = require('crypto')

module.exports = (payload, salt) => {
    delete payload.mac
    const sotred = Object.keys(payload).sort().reduce(
        (obj, key) => {
            obj[key] = payload[key];
            return obj;
        },
        {}
    );
    const valueString = Object.values(sotred).join('|')
    return crypto.createHmac('sha1', salt).update(valueString).digest('hex')
}