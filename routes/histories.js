const router = require("express").Router();
const User = require("../models/User");
const History = require("../models/History");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
//CREATE History
router.post("/", upload.single("photo"),async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    let newHistory = new History({
      date: req.body.date,
      title: req.body.title,
      text: req.body.text,
      photo: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await newHistory.save();
    res.status(200).json(newHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE History
router.put("/:id", upload.single("photo"),async (req, res) => {
  console.log(req.file)
  try {
      const history = await History.findById(req.params.id);
        const result = await cloudinary.uploader.upload(req.file.path);
        await cloudinary.uploader.destroy(history.cloudinary_id);
        if(req.file){
          await cloudinary.uploader.destroy(history.cloudinary_id);
          const result = await cloudinary.uploader.upload(req.file.path);
        }
        const data={
          date:req.body.date,
          text:req.body.text,
          title:req.body.title,
          photo:result.secure_url,
          cloudinary_id:result.public_id
        }
          try {
            const updatedPost = await History.findByIdAndUpdate(
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

//DELETE History
router.delete("/:id", async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
      try {
        await history.delete();
        res.status(200).json("History has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET History
router.get("/:id", async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL HistoryS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Histories;
    if (username) {
      Histories = await History.find({ username });
    } else if (catName) {
      Histories = await History.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Histories = await History.find();
    }
    res.status(200).json(Histories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
