import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { sendWelcomeEmail } from '../utils/email.js';
import { calculateTrialEndDate } from '../utils/subscription.js';

const prisma = new PrismaClient();

export const register = async (req, res, next) => {
  try {
    const { email, password, name, phone, restaurantName, subdomain } = req.body;

    // Validate required fields
    if (!email || !password || !name || !restaurantName || !subdomain) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Check if subdomain is taken
    const existingRestaurant = await prisma.restaurant.findUnique({ where: { subdomain } });
    if (existingRestaurant) {
      return res.status(400).json({ error: 'Subdomain already taken' });
    }

    // Validate subdomain format (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/.test(subdomain)) {
      return res.status(400).json({ error: 'Subdomain can only contain lowercase letters, numbers, and hyphens' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with restaurant and trial subscription
    const trialEndDate = calculateTrialEndDate(parseInt(process.env.TRIAL_PERIOD_DAYS) || 7);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        restaurant: {
          create: {
            name: restaurantName,
            subdomain,
            subscription: {
              create: {
                plan: 'TRIAL',
                status: 'TRIAL',
                trialEndsAt: trialEndDate,
                currentPeriodStart: new Date(),
                currentPeriodEnd: trialEndDate,
              }
            }
          }
        }
      },
      include: {
        restaurant: {
          include: {
            subscription: true
          }
        }
      }
    });

    // Send welcome email
    await sendWelcomeEmail(email, name, restaurantName);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: 'Registration successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        restaurant: {
          include: {
            subscription: true
          }
        }
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isAdmin: true,
        createdAt: true,
        restaurant: {
          include: {
            subscription: true
          }
        }
      }
    });

    // Parse banners if it's a JSON string (SQLite compatibility)
    if (user?.restaurant?.banners && typeof user.restaurant.banners === 'string') {
      try {
        user.restaurant.banners = JSON.parse(user.restaurant.banners);
      } catch (e) {
        user.restaurant.banners = [];
      }
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};