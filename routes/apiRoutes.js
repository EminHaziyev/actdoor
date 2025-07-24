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
    // res.json({activity: user.activity});

    if (type == "square") {
        res.render('square', { activity: user.activity });
    }
    else if (type == "rectangle") {
        res.render('rectangle', { activity: user.activity });
    }

});



router.get('/getActivityRaw/:username', async (req,res)  => {

    const username = req.params.username;
    const user = await User.findOne({username});

    if(!user) {
        return res.status(400).json({message: 'User not found'});
    }

    res.json({activity: user.activity});

});


router.get('/sendMessage/:username', apiLimiter, authenticateWithToken, async (req,res)=>{
    const username = req.params.username;
    const message = req.body.message;


    const user = await User.findOne({name: username});

    if(!user){
        res.status(400).json({message: 'User not found'});
        
    }
    
    if(user.message == false){
        user.message = true;
        await user.save();

    }
    else if(user.message == true){
        user.message = false;
        await user.save();
    }

    




})




module.exports = router;
