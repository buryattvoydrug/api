const router = require("express").Router();
const User = require("../models/User");
const Contact = require("../models/Contact");

//CREATE Contact
router.post("/", async (req, res) => {
  const newPost = new Contact(req.body);
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
    const contact = await Contact.findById(req.params.id);
      try {
        const updatedPost = await Contact.findByIdAndUpdate(
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
    let Contacts;
    if (username) {
      Contacts = await Contact.find({ username });
    } else if (catName) {
      Contacts = await Contact.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Contacts = await Contact.find();
    }
    res.status(200).json(Contacts);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
