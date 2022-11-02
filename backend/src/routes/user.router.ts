import express from 'express';
import * as DbQuery from '../services/db.service';
import * as UserModel from '../models/user.models';
export const userRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *        lastName:
 *          type: string
 *        firstName:
 *          type: string
 *        biography:
 *          type: string
 *        passwd:
 *          type: string
 *        gender:
 *          type: enum('m', 'f', 'o')
 *        sexualPreference:
 *          type: enum('bi', 'hetero', 'homo')
 *        profileImg:
 *          type: string
 *        age:
 *          type: number
 *      example:
 *        last_name: 'ham'
 *        first_name: 'jaewon'
 *        passwd: '1234'
 *        gender: 'm'
 *        sexual_preference: 'hetero'
 *        biography: '42Seoul Memeber'
 *        profile_img: 'http://localhost:8080/img?id=2'
 *        age: 26
 *
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *
 *  security:
 *    - BearerAuth: []
 */

/**
 * @swagger
 *  /user?id:
 *    get:
 *      summary:
 *        - Get user's public info
 *      tags:
 *        - user
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: integer
 *          dsecription: The id of User
 *      responses:
 *       '200':
 *        description: user's public info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req, res) => {
  const { id: idQuery } = req.query;

  if (typeof idQuery !== 'string') {
    res.send('error query');
  } else {
    const id = Number(idQuery);
    if (isNaN(id)) {
      res.send('error query');
    } else {
      const rows = await DbQuery.findUserById(id);

      console.log(rows);
      res.send(rows);
    }
  }
});

/**
 * @swagger
 *  /user?id:
 *    patch:
 *      summary:
 *        - update user's public info
 *      tags:
 *        - user
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: integer
 *          dsecription: The id of User
 *      requestBody:
 *        description: user info to update
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *
 *      responses:
 *       '200':
 *        description: user's public info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userRouter.patch('/', async (req, res) => {
  const { id: idQuery } = req.query;

  if (typeof idQuery !== 'string') {
    res.send('error query');
  } else {
    const id = Number(idQuery);
    if (isNaN(id)) {
      res.send('error query');
    } else {
      const newUserInfo: UserModel.UserInfo = req.body;
      console.log(req.body);
      const rows = await DbQuery.updateUserInfo(id, req.body);

      console.log(rows);
      res.send(rows);
    }
  }
});

/**
 * @swagger
 *  /user?id:
 *    get:
 *      summary:
 *        - Get my info
 *      tags:
 *        - user
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: integer
 *          dsecription: The id of User
 *      responses:
 *       '200':
 *        description: user's public info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userRouter.get('/me', () => {
  console.log('/user/me');
});

userRouter.post('/:id', () => {
  console.log('hi');
});

userRouter.patch('/:id', () => {
  console.log('hi');
});
