const router = require("express").Router();
const User = require("../models/User");
const Group = require("../models/Group");

//CREATE Group
router.post("/", async (req, res) => {
  const newGroup = new Group(req.body);
  try {
    const savedGroup = await newGroup.save();
    res.status(200).json(savedGroup);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Group
router.put("/:id", async (req, res) => {
  console.log(req.body)
  try {
    const group = await Group.findById(req.params.id);
      try {
        const updatedGroup = await Group.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedGroup);
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Group
router.delete("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
      try {
        await group.delete();
        res.status(200).json("Group has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Group
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL GroupS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Groups;
    if (username) {
      Groups = await Group.find({ username });
    } else if (catName) {
      Groups = await Group.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Groups = await Group.find();
    }
    res.status(200).json(Groups);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
