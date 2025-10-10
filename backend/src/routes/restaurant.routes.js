import express from 'express';
import {
  getRestaurantBySubdomain,
  updateRestaurant,
  uploadBanner,
  deleteBanner
} from '../controllers/restaurant.controller.js';
import { getCategories } from '../controllers/category.controller.js';
import { authenticate, requireRestaurant } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Get categories for a restaurant (protected) - MUST be before /:subdomain
router.get('/:restaurantId/categories', authenticate, getCategories);

// Protected routes
router.put('/:id', authenticate, requireRestaurant, updateRestaurant);
router.post('/:id/upload-banner', authenticate, requireRestaurant, upload.single('banner'), uploadBanner);
router.delete('/:id/delete-banner', authenticate, requireRestaurant, deleteBanner);

// Public route - get restaurant by subdomain - MUST be last
router.get('/:subdomain', getRestaurantBySubdomain);

export default router;