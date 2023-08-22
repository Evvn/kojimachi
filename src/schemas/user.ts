import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(new RegExp(/^\S+@\S+\.\S+$/)) // regex to check email matches typical format
    .required()
    .messages({
      'string.pattern.base':
        'Invalid email. Please use a valid format, e.g. evan@kojimachi.com',
      'any.required': 'Email is required.',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(
      // regex to check password meets minimum complexity requirements
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      )
    )
    .messages({
      'string.min': 'Password must be at least 6 characters.',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number.',
      'any.required': 'Password is required.',
    }),
});
