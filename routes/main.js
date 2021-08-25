const router = require("express").Router();
const User = require("../models/User");
const Main = require("../models/Main");

//CREATE Main
router.post("/", async (req, res) => {
  const newPost = new Main(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  console.log(req.body)
  try {
    const main = await Main.findById(req.params.id);
      try {
        const updatedPost = await Main.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL 
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let main;
    if (username) {
      main = await Main.find({ username });
    } else if (catName) {
      main = await Main.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      main = await Main.find();
    }
    res.status(200).json(main);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
