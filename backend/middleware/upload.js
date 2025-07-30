const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Avatar Upload (1 image)
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 300, height: 300, crop: "thumb", gravity: "face" }],
    public_id: (req, file) => `${req.user.id}-avatar`,
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// Post Image Upload (multiple)
const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) =>
      `${req.user.id}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

const uploadPost = multer({
  storage: postStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = {
  uploadAvatar,
  uploadPost,
};
