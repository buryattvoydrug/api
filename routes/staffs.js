const router = require("express").Router();
const User = require("../models/User");
const Staff = require("../models/Staff");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
//CREATE Staff
router.post("/", async (req, res) => {
  console.log(req.body)
  const newStaff = new Staff(req.body);
  try {
    const savedPost = await newStaff.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Staff
router.put("/:id", async (req, res) => {
  console.log(req.body)
  try {
    const contact = await Staff.findById(req.params.id);
      try {
        const updatedPost = await Staff.findByIdAndUpdate(
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

//DELETE Staff
router.delete("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
      try {
        await staff.delete();
        res.status(200).json("Staff has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Staff
router.get("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL StaffS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Staffs;
    if (username) {
      Staffs = await Staff.find({ username });
    } else if (catName) {
      Staffs = await Staff.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Staffs = await Staff.find();
    }
    res.status(200).json(Staffs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
