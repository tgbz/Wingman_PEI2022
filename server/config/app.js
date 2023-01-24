const fs = require('fs')

module.exports = {
    userPrivateKey: fs.readFileSync('./config/keys/user.key'),
    userPublicKey: fs.readFileSync('./config/keys/user.key.pub'),
}


