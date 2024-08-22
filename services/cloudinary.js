const {v2} = require("cloudinary");

const uploadOnCloudnary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "blogs",
      resource_type: "auto",
    });
    console.log("File Uploaded on cloudiinary : ", result.url);

    return result;
  } catch (error) {
    return null;
  }
};

exports.module =  { uploadOnCloudnary };
