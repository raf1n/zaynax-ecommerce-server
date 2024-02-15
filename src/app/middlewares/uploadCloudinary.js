const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("../../config/config");

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const generateFolder = (req, file) => {
  return `zaynax-images/${file.fieldname}`;
};

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: generateFolder(req, file),
      resource_type: "auto",
      transformation: [{ width: 500, height: 500, crop: "fit" }],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000, // 3MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(null, true);
  },
});

const UploadImageCloudinary = upload;

// Delete image from cloudinary
const deleteImageCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  UploadImageCloudinary,
  deleteImageCloudinary,
};
