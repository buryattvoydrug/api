const router = require("express").Router();
const User = require("../models/User");
const Group = require("../models/Group");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
//CREATE Group
// router.post("/", async (req, res) => {
//   const newGroup = new Group(req.body);
//   try {
//     const savedGroup = await newGroup.save();
//     res.status(200).json(savedGroup);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  // console.log(req.file2)y
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // const result2 = await cloudinary.uploader.upload(req.file2.path);

    let newPost = new Group({
      title: req.body.title,
      type: req.body.type,
      name: req.body.name,
      day1: req.body.day1,
      time1: req.body.time1,
      day2: req.body.day2,
      time2: req.body.time2,
      day3: req.body.day3,
      time3: req.body.time3,
      image: result.secure_url,
      // photo: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.log(err);
  }
});
//UPDATE Group
router.put("/:id", upload.single("image"), async (req, res) => {
  console.log(req.body)
  try {
    const group = await Group.findById(req.params.id);
    const result = await cloudinary.uploader.upload(req.file.path);
    await cloudinary.uploader.destroy(group.cloudinary_id);
    if(req.file){
      await cloudinary.uploader.destroy(group.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
    }
    const data={
      title: req.body.title,
      type: req.body.type,
      name: req.body.name,
      day1: req.body.day1,
      time1: req.body.time1,
      day2: req.body.day2,
      time2: req.body.time2,
      day3: req.body.day3,
      time3: req.body.time3,
      image: result.secure_url,
      // photo: result.secure_url,
      cloudinary_id: result.public_id,
    }
      try {
        const updatedGroup = await Group.findByIdAndUpdate(
          req.params.id,
          data,
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
