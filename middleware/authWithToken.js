const User = require('../models/user');

const authenticateWithToken = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        const user = await User.findOne({ uniqueKey: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid token.' });
        }
        
        req.apiKey = token;
        next();
    } catch (ex) {
        console.error(ex);
        res.status(500).json({ message: 'An error occurred while validating the token.' });
    }
};

module.exports = authenticateWithToken;
