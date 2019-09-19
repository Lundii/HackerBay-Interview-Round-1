import { createToken } from '../utils/verification';

/**
 * Controller to handle login request
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @return {object} the response object
 */
export const login = (req, res) => {
  const { username } = req.body;
  const token = createToken({ username });
  res.status(200).json({
    username,
    token,
  });
};

export default login;
