const jwt = require('jsonwebtoken');

const createToken = user => {
    let token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '240s'});
    return token;
}

const verifyyToken = token => {
    return jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if(err) return err;
        return result;
    })
}

module.exports = {
    createToken, verifyyToken
}