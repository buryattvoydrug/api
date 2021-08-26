const router = require("express").Router();
const User = require("../models/User");
const Award = require("../models/Award");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
//CREATE Award
router.post("/",upload.single("photo"),  async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    let newAward = new Award({
      date: req.body.date,
      title: req.body.title,
      gold: req.body.gold,
      silver: req.body.silver,
      bronze: req.body.bronze,
      part: req.body.part,
      photo: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await newAward.save();
    res.status(200).json(newAward);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Award
router.put("/:id",upload.single("photo"),  async (req, res) => {
  console.log(req.body,req.file)
      try {
        const award = await Award.findById(req.params.id);
        const result = await cloudinary.uploader.upload(req.file.path);
        await cloudinary.uploader.destroy(award.cloudinary_id);
        if(req.file){
          await cloudinary.uploader.destroy(award.cloudinary_id);
          const result = await cloudinary.uploader.upload(req.file.path);
        }
        const data={
          date: req.body.date,
          title: req.body.title,
          gold: req.body.gold,
          silver: req.body.silver,
          bronze: req.body.bronze,
          part: req.body.part,
          photo: result.secure_url,
          cloudinary_id: result.public_id,
        }
          try {
            const updatedPost = await Award.findByIdAndUpdate(
              req.params.id,
              data,
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

//DELETE Award
router.delete("/:id", async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
      try {
        await award.delete();
        res.status(200).json("Award has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Award
router.get("/:id", async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    res.status(200).json(award);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL AwardS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Awards;
    if (username) {
      Awards = await Award.find({ username });
    } else if (catName) {
      Awards = await Award.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Awards = await Award.find();
    }
    res.status(200).json(Awards);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
