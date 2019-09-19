import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY || 'justanysecret';

/**
 * Util function to help create a token
 * @param {object} payload - the payload to add to the token
 * @return {string} the token string
 */
export const createToken = (payload) => {
  const token = jwt.sign({ payload }, secretKey, {
    expiresIn: '24h',
  });
  return token;
};

/**
 * middleware to verify token
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {object} next - the next middleware function
 */
export const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorzation;
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    const options = { expiresIn: '24h' };
    jwt.verify(token, secretKey, options, (error, payload) => {
      if (error) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }
      req.payload = payload;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
};
