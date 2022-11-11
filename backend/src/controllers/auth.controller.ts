import { NextFunction, Request, Response } from 'express';
import { findUser, getUserToken } from '../services/auth.service';

export async function createToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = await findUser({
      loginname: req.body.loginname,
      passwd: req.body.passwd,
    });

    if (userId === null) {
      res.status(400).send();
      return;
    }

    const userToken = await getUserToken(userId);
    res.send(userToken);
  } catch (err) {
    console.error(`Error while create user token: ${err}`);
    next(err);
  }
}
