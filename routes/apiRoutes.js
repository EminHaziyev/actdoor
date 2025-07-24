const express = require("express");
const rateLimitMiddleware = require("../middleware/rateLimit");
const User = require("../models/user");
const authenticateWithToken = require("../middleware/authWithToken");
const apiLimiter = require("../middleware/rateLimit");
const router = express.Router();

const { getSvgRectangle, getSvgEmpty } = require("./svgFiles");

router.post("/setActivity", apiLimiter, authenticateWithToken, (req, res) => {
  const apiKey = req.apiKey;

  const activity = req.body.activity;

  User.findOne({ uniqueKey: apiKey })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      user.activity = req.body.activity;
      user.markModified("activity");
      return user.save();
    })
    .then(() => res.json({ message: "Activity set successfully" }))
    .catch((err) =>
      res.status(400).json({ message: "Error setting activity" })
    );
});

router.get("/getActivity/:username", async (req, res) => {
  const username = req.params.username;
  const type = req.query.type;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (user.updatedAt && user.activity.time !== -1) {
    const startTime = new Date(user.updatedAt);
    const now = new Date();
    const diffMs = now.getTime() - startTime.getTime();
    if (diffMs > 60 * 1000) {
      user.activity.time = -1;
      await user.save();
    }
  }

  if (type == "square") {
    res.render("square", { activity: user.activity });
  } else if (type == "rectangle") {
    res.render("rectangle", { activity: user.activity });
  }else if (type == "github") {
    const seconds = user.activity.time;
    const file = user.activity.fileName;
    const folder = user.activity.folderName;

    if(seconds === -1) {
      const svg = getSvgEmpty();
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "no-cache");
      res.send(svg);
    }
    else{
      const time = new Date(seconds * 1000).toISOString().slice(11, 19);
      
      console.log(folder, file, time);
      const svg = getSvgRectangle(folder,file,time);
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "no-cache");
      res.send(svg);
    
    }
    
    
    
    
  }
  else {
    res.json({ activity: user.activity });
  }
});

module.exports = router;
