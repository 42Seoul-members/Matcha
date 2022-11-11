import { RowDataPacket } from 'mysql2';

export interface RefreshTokenQuery extends RowDataPacket {
  refresh_token: string | null;
}
