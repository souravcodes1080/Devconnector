const multer = require("multer");
const path = require("path");
const fs = require("fs");

//diskStorage
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/posts";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${req.user.id}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const postFileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const extname = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowed.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only (jpeg, jpg, png and gif) type Images are supported."));
  }
};

const uploadPostImage = multer({
  storage: postStorage,
  fileFilter: postFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadPostImage;
