import * as Mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import * as UserModel from '../models/user.models';

const caseConverter = (str: string) =>
  str.replace(/[A-Z]/g, (match) => '_' + match).toUpperCase();

const updateQueryBuilder = (
  tableName: string,
  keyName: string,
  { id, ...rest }: Partial<UserModel.UserInfo>
) =>
  `UPDATE ${tableName} SET ${Object.entries(rest).reduce(
    (acc, curr) =>
      `${curr[1] === undefined ? acc : acc + (acc.length === 0 ? '' : ', ')}${
        curr[0]
      }= :${curr[0]}`,
    ''
  )} WHERE ${keyName}= :id`;

const FIND_USER_BY_ID_SQL = 'SELECT * from user_info WHERE id= :id ';
const UPDATE_EMAIL_SQL = 'UPDATE email_list SET email= :email WHERE ID= :id';

dotenv.config();

const pool: Mysql.Pool = Mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || ''),
  database: process.env.DB_DATABASE,
  namedPlaceholders: true,
});

const getConnection = async (): Promise<Mysql.PoolConnection> => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    return getConnection();
  }
};

export const findUserById = async (id: number) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(FIND_USER_BY_ID_SQL, { id });
    await connection.release();
    return rows;
  } catch (err) {
    throw err;
  }
};

export const updateUserInfo = async (
  id: number,
  newUserInfo: Partial<UserModel.UserInfo>
) => {
  const connection = await getConnection();

  try {
    await connection.execute(
      updateQueryBuilder('USER_INFO', 'ID', newUserInfo),
      {
        id,
        ...newUserInfo,
      }
    );
  } catch (err) {
    console.log(err);
  } finally {
    connection.release();
  }
};

export const updateUserEmail = async (id: number, email: string) => {
  const connection = await getConnection();
  await connection.beginTransaction();

  try {
    const [rows] = await connection.execute(UPDATE_EMAIL_SQL, { id, email });
    return rows;
  } catch (err) {
    connection.rollback();
  } finally {
    await connection.release();
  }
};

// export const query = async (sql: string, params: { [param: string]: any }) => {
//   const connection =

//   try {
//     const [rows] = await connection.execute(sql, params);
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// };

//=======================================================

const SELECT_USER_BY_LOGINNAME_SQL = `select user_id, passwd from loginname_list join user_info on loginname_list.user_id=user_info.id where loginname_list.loginname= :loginname`;
const SELECT_TOKEN_BY_UID_SQL = `select refresh_token from refresh_token_list where user_id= :user_id`;

interface temp {
  user_id: number;
  passwd: string;
}

export async function getUserByLoginname(loginname: string) {
  const connection = await getConnection();
  try {
    const userAuthInfo = (await connection.execute(
      SELECT_USER_BY_LOGINNAME_SQL,
      {
        loginname,
      }
    )) as unknown as UserModel.UserLoginnameAuthInfo[];

    connection.release();
    return userAuthInfo;
  } catch (err) {
    connection.release();
    throw new Error();
  }
}

export async function getRefreshToken(userId: number) {
  const connection = await getConnection();

  try {
    const refreshToken = (await connection.execute(SELECT_TOKEN_BY_UID_SQL, {
      user_id: userId,
    })) as unknown as string[];

    connection.release();
    return refreshToken;
  } catch (err) {
    connection.release();
    throw new Error();
  }
}
