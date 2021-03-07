import express, { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import User, { IUser } from '../models/User';

const router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
  const users: IUser[] = await User.find({}).limit(Number(req.query.limit));
  try {
    res.status(200).json({ success: true, users });
  } catch (message) {
    res.status(400).json({ success: false, message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  User.findById(req.params.id, (err: CallbackError, user: IUser | null) => {
    if (!user) res.status(404).json({ success: false });
    else if (err) res.status(400).json({ success: false, message: err });
    else res.status(200).json({ success: true });
  });
});

router.put('/:id', async (req: Request, res: Response) => {
  const dateOfBirth =
    req.body.dateOfBirth === undefined
      ? undefined
      : new Date(req.body.dateOfBirth);

  const update = {
    username: req.body.username,
    name: req.body.name,
    dateOfBirth,
  };

  User.findByIdAndUpdate(
    req.params.id,
    update,
    null,
    (err: any, user: IUser | null) => {
      if (!user) res.status(404).json({ success: false });
      else if (err) res.status(400).json({ success: false, message: err });
      else res.status(200).json({ success: true });
    }
  );
});

router.delete('/:id', async (req: Request, res: Response) => {
  User.findByIdAndRemove(
    req.params.id,
    null,
    (err: any, user: IUser | null) => {
      if (!user) res.status(404).json({ success: false });
      else if (err) res.status(400).json({ success: false, message: err });
      else res.status(200).json({ success: true, user });
    }
  );
});

router.post('/new', async (req: Request, res: Response) => {
  const dateOfBirth =
    req.body.dateOfBirth === undefined
      ? undefined
      : new Date(req.body.dateOfBirth);

  const user = {
    username: req.body.username,
    name: req.body.name,
    dateOfBirth,
  };

  User.create(user)
    .then((user: IUser) => {
      res.status(200).json({ success: true, user });
    })
    .catch((message: any) => {
      res.status(400).json({ success: false, message });
    });
});

export default router;
