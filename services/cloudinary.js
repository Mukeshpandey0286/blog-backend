const { v2: cloudinary } = require("cloudinary");

const uploadOnCloudnary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "blogs",
      resource_type: "auto",
    });
    console.log("File Uploaded on cloudinary: ", result.url);

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary: ", error);
    return null;
  }
};

module.exports = { uploadOnCloudnary };
