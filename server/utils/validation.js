import { body, validationResult } from 'express-validator/check';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map((current) => current.msg);
    return res.status(422).json({ errors: validationErrors });
  }
  next();
};

export const loginValidation = [
  body('username', 'username is required').exists(),
  body('password', 'password is required').exists(),
];
