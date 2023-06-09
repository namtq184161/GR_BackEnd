const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTemp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: path },
      (err, res) => {
        if (err) {
          removeTemp(file.tempFilePath);
          return res.status(400).json({ message: 'Failed to upload image.' });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

exports.getImages = async (req, res) => {
  const { path, sort, max } = req.body;
  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by('created_at', `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err.error.message);
    });
};
