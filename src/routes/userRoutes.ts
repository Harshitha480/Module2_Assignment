import express, { Request, Response } from 'express';
import { User, users } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /register - Register a new user
router.post('/register', (req: Request, res: Response): void => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully.', user: newUser });
});

// POST /login - Login user
router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials.' });
    return;
  }

  res.json({ message: 'Login successful.', user });
});

// GET /user/:id - Get user by ID
router.get('/user/:id', (req: Request, res: Response): void => {
  const { id } = req.params;

  const user = users.find(u => u.id === id);

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  res.json(user);
});

export default router;
