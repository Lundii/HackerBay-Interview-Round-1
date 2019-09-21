import jsonPatch from 'json-patch';
import download from 'image-downloader';
import path from 'path';
import Jimp from 'jimp';

/**
 * constroller to patch json
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @return the modified json
 */
export const patchJson = (req, res) => {
  const { docs, patch } = req.body;
  try {
    const newDocs = jsonPatch.apply(docs, patch);
    return res.status(200).json(newDocs);
  } catch (error) {
    return res.status(400).json({
      type: error.name,
      error: error.message,
    });
  }
};

/**
 * Downloads an image and returns a thumbnail of the image
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @return a thumbnail of the image
 */
export const generateThumbnail = async (req, res) => {
  const { imageUrl } = req.body;
  const options = {
    url: imageUrl,
    dest: path.resolve(__dirname, '../', './images'),
  };
  try {
    const sendResponse = (file) => {
      res.sendFile(file);
    };
    const { filename } = await download.image(options);
    const output = path.resolve(__dirname, '../', './images/thumbnail.jpg');
    Jimp.read(filename)
      .then((file) => file.resize(50, 50).write(output));
    setTimeout(() => {
      sendResponse(output);
    }, 2000);
  } catch (error) {
    res.status(400).json({
      error: 'There was an error while processing the image, please check your url',
    });
  }
};
