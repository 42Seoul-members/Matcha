export type GenderType = 'm' | 'f' | 'o';
export type SexualPreferenceType = 'bi' | 'hetero' | 'homo';

export interface UserInfo {
  id: number;
  lastName: string;
  firstName: string;
  passwd: string;
  gender: GenderType | null;
  sexualPreference: SexualPreferenceType | null;
  biography: string;
  lastLogin: string;
  blockedDate: string | null;
  profileImg: number | null;
  age: number;
}

export interface UserMeDTO extends UserInfo {}

export interface UserInfoDTO {
  id: number;
  lastName: string;
  firstName: string;
  gender: GenderType | null;
  sexualPreference: SexualPreferenceType | null;
  biography: string;
  lastLogin: string;
  blockedDate: string | null;
  profileImg: number | null;
  age: number;
}
