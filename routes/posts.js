const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
//CREATE POST
// router.post("/", async (req, res) => {
//   const newPost = new Post(req.body);
//   try {
//     const savedPost = await newPost.save();
//     res.status(200).json(savedPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.post("/", upload.single("photo"), async (req, res) => {
  console.log(req.file)
  console.log(req.body)
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    let newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      photo: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.log(err);
  }
});

//UPDATE POST
router.put("/:id", upload.single("photo"), async (req, res) => {
  console.log('file',req.file)
  console.log('body',req.body)
  try {
    const post = await Post.findById(req.params.id);
    const result = await cloudinary.uploader.upload(req.file.path);
    await cloudinary.uploader.destroy(post.cloudinary_id);
    if(req.file){
      await cloudinary.uploader.destroy(post.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
    }
    const data={
      title:req.body.title,
      text:req.body.text,
      photo:result.secure_url,
      cloudinary_id:result.public_id
    }
      try {
        const updatedPost = await Post.findByIdAndUpdate(
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

//DELETE POST
router.delete("/:id", async (req, res) => {
  console.log(req.file)
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
