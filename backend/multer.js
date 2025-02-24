const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloud");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bites", ///name of the folder in cloduinary
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
