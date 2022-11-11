import * as db from './db.service';
import jwt from 'jsonwebtoken';

export async function findUser({
  loginname,
  passwd,
}: {
  loginname: string;
  passwd: string;
}) {
  try {
    const userAuthInfo = await db.getUserByLoginname(loginname);

    if (userAuthInfo.length === 0 || userAuthInfo[0].passwd !== passwd) {
      return null;
    }

    return userAuthInfo[0].user_id;
  } catch (err) {
    throw err;
  }
}

export async function getUserToken(userId: number) {
  try {
    const refreshToken = await db.getRefreshToken(userId);

    if (refreshToken.length !== 0 && refreshToken[0].refresh_token !== null) {
      return refreshToken[0];
    }

    if (!process.env.JWT_SECRET) {
      throw new Error();
    }

    const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });

    await db.updateRefreshToken(userId, newToken);

    return newToken;
  } catch (err) {
    throw err;
  }
}
