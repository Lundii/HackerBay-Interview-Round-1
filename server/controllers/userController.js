import jsonPatch from 'json-patch';

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
