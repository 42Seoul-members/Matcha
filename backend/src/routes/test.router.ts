import express from 'express';

export const testRouter = express.Router();

/**
 * @swagger
 *  /test?id:
 *    get:
 *      summary:
 *        - Get user's public info
 *      tags:
 *        - test
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
 */
testRouter.get('/', (req, res) => {
  req.header
});
