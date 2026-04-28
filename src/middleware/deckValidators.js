import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];
export const validateCardList = [
  body('cards')
    .exists({ values: 'falsy'})
    .withMessage('Cards are required')
    .bail()
    .isString({min: 1, max: 50})
    .withMessage('Cards must be a string')
    .bail()
    .matches(/^\d+(,\d+)*$/)
    .withMessage('Cards must be in the format (Card#,Card#,Card#)'),
    handleValidationErrors,
];

export const validateCreateDeck = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('description')
    .exists({ values: 'falsy' })
    .withMessage('Description is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({min: 10})
    .withMessage('Description must be at least 10 characters'),
  body('leaderId')
    .exists({ values: 'falsy' })
    .withMessage('LeaderId is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Leader Id must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateDeck = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('leaderId').exists({ values: 'falsy'}),
    ],
    { message: 'At least one field (name, description, leaderId) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({min: 10})
    .withMessage('Description must be at least 10 characters'),
  body('leaderId')
    .optional()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('Leader Id must be a positive integer'),

  handleValidationErrors,
];

export const validateDeckQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'description', 'leaderId', 'authorId', 'createdAt'])
    .withMessage('sortBy must be one of id, name, description, leader Id, author Id, createdAt'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be an integer between 1 and 50'),

  handleValidationErrors,
];
