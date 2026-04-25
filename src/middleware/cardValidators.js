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

export const validateCreateCard = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('cost')
    .exists({values: 'falsy'})
    .withMessage('Cost is required')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Cost must be a positive integer'),
  body('stats')
    .optional()
    .isString()
    .withMessage('Stats must be a string')
    .bail()
    .matches(/^\+?\-?\d+\/\+?\-?\d+$/)
    .withMessage('Stats must be in format: attack/health, where attack and health are numbers'),
  body('traits')
    .exists({ values: 'falsy' })
    .withMessage('Traits are required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Traits must be a string'),
  body('type')
    .exists({ values: 'falsy' })
    .withMessage('Type is required')
    .bail()
    .isIn(['EVENT', 'UNIT', 'UPGRADE'])
    .withMessage('type must be one of EVENT, UNIT, UPGRADE'),
  body('text')
    .exists({ values: 'falsy' })
    .withMessage('Text is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Text must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Text must be at least 10 characters'),
    body('aspects')
    .exists({ values: 'falsy' })
    .withMessage('Aspects is required')
    .bail()
    .trim()
    .escape()
    .matches(/^(Aggression|Vigilance|Cunning|Command|Heroism|Villainy)(\s*,\s*(Aggression|Vigilance|Cunning|Command|Heroism|Villainy))*$/)
    .withMessage('aspects must be one or more of the following: Aggression, Vigilance, Cunning, Command, Heroism, Villainy'),

  handleValidationErrors,
];

export const validateUpdateCard = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('text').exists({ values: 'falsy' }),
      body('cost').exists({ values: 'falsy'}),
      body('stats').exists({values: 'falsy'}),
      body('traits').exists({values: 'falsy'}),
      body('type').exists({values: 'falsy'}),
      body('aspects').exists({values: 'falsy'})
    ],
    { message: 'At least one field (name, text, cost, stats, traits, type) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('cost')
    .optional()
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Cost must be a positive integer'),
  body('stats')
    .optional()
    .isString()
    .withMessage('Stats must be a string')
    .bail()
    .matches(/^\+?\-?\d+\/\+?\-?\d+$/)
    .withMessage('Stats must be in format: attack/health, where attack and health are numbers'),
  body('traits')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Traits must be a string'),
  body('type')
    .optional()
    .isIn(['EVENT', 'UNIT', 'UPGRADE'])
    .withMessage('type must be one of EVENT, UNIT, UPGRADE'),
  body('text')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Text must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Text must be at least 10 characters'),
    body('aspects')
    .optional()
    .trim()
    .escape()
    .matches(/^(Aggression|Vigilance|Cunning|Command|Heroism|Villainy)(\s*,\s*(Aggression|Vigilance|Cunning|Command|Heroism|Villainy))*$/)
    .withMessage('aspects must be one or more of the following: Aggression, Vigilance, Cunning, Command, Heroism, Villainy'),

  handleValidationErrors,
];

export const validateCardQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'text', 'cost', 'type', 'traits'])
    .withMessage('sortBy must be one of id, name, text, cost, type, traits'),

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
