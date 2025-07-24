const express = require('express');
const rateLimitMiddleware = require('../middleware/rateLimit');
const User = require('../models/user');
const authenticateWithToken = require('../middleware/authWithToken');
const apiLimiter = require('../middleware/rateLimit');
const router = express.Router();



router.post('/setActivity', apiLimiter, authenticateWithToken, (req, res) => {
    const apiKey = req.apiKey;

    const activity = req.body.activity;


    User.updateOne({ uniqueKey: apiKey }, { activity })
        .then(() => res.json({ message: 'Activity set successfully' }))
        .catch(err => res.status(400).json({ message: 'Error setting activity' }));

});

router.get('/getActivity/:username', async (req, res) => {
    const username = req.params.username;
    const type = req.query.type;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    if (user.activity.startTime && user.activity.time !== -1) {
        const startTime = new Date(user.activity.startTime);
        const now = new Date();
        const diffMs = now - startTime;
        if (diffMs > 60 * 1000) { 
            user.activity.time = -1;
            await user.save();
        }
    }

    if (type == "square") {
        res.render('square', { activity: user.activity });
    }
    else if (type == "rectangle") {
        res.render('rectangle', { activity: user.activity });
    }
    else{
        res.json({ activity: user.activity });
    }

});



module.exports = router;
