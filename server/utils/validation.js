import { body, validationResult } from 'express-validator';

/**
 * validation middleware to check to validate input paraments
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {function} next - function to call the next middleware
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map((current) => current.msg);
    return res.status(422).json({ errors: validationErrors });
  }
  next();
};

/**
 * Array of chained input validations to check the passed username and password
 */
export const loginValidation = [
  body('username', 'username is required').exists(),
  body('username', 'username must be a string').isString(),
  body('password', 'password is required').exists(),
];
