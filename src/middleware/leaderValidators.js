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

export const validateCreateLeader = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
    body('aspects')
    .exists({ values: 'falsy' })
    .withMessage('Aspects is required')
    .bail()
    .trim()
    .escape()
    .matches(/^(Aggression|Vigilance|Cunning|Command|Heroism|Villainy)(\s*,\s*(Aggression|Vigilance|Cunning|Command|Heroism|Villainy))*$/)
    .withMessage('aspects must be one or more of the following: Aggression, Vigilance, Cunning, Command, Heroism, Villainy'),
  body('flipCondition')
    .exists({values: 'falsy'})
    .withMessage('Flip condition is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage('Flip condition must be at least 10 characters'),
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

  handleValidationErrors,
];

export const validateUpdateLeader = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('text').exists({ values: 'falsy' }),
      body('flipCondition').exists({ values: 'falsy'}),
      body('stats').exists({values: 'falsy'}),
      body('traits').exists({values: 'falsy'}),
      body('aspects').exists({ values: 'falsy' })
    ],
    { message: 'At least one field (name, text, flipCondition, aspects, stats, traits) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('flipCondition')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 10 })
    .withMessage('Flip condition must be at least 10 characters'),
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
  body('aspects')
    .optional()
    .trim()
    .escape()
    .matches(/^(Aggression|Vigilance|Cunning|Command|Heroism|Villainy)(\s*,\s*(Aggression|Vigilance|Cunning|Command|Heroism|Villainy))*$/)
    .withMessage('aspects must be one or more of the following: Aggression, Vigilance, Cunning, Command, Heroism, Villainy'),
  body('text')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Text must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Text must be at least 10 characters'),

  handleValidationErrors,
];

export const validateLeaderQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'text', 'flipCondition', 'type', 'traits'])
    .withMessage('sortBy must be one of id, name, text, flipCondition, type, traits'),

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
