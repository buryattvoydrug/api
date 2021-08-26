const router = require("express").Router();
const User = require("../models/User");
const Staff = require("../models/Staff");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
//CREATE Staff
router.post("/",upload.single("photo"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    let newStaff = new Staff({
      type: req.body.type,
      name: req.body.name,
      text: req.body.text,
      photo: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await newStaff.save();
    res.status(200).json(newStaff);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Staff
router.put("/:id", upload.single("photo"),async (req, res) => {
  console.log(req.body)
  console.log(req.file)
      try {
        const staff = await Staff.findById(req.params.id);
        const result = await cloudinary.uploader.upload(req.file.path);
        await cloudinary.uploader.destroy(staff.cloudinary_id);
        if(req.file){
          await cloudinary.uploader.destroy(staff.cloudinary_id);
          const result = await cloudinary.uploader.upload(req.file.path);
        }
        const data={
          type:req.body.type,
          text:req.body.text,
          name:req.body.name,
          photo:result.secure_url,
          cloudinary_id:result.public_id
        }
          try {
            const updatedPost = await Staff.findByIdAndUpdate(
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
