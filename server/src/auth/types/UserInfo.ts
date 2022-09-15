export interface UserInfoType {
  username: string;
  password: string;
  email: string;
  phone: string;
  salt: string;
}

export interface LoginFormType {
  email: string;
  password: string;
  repassword: string;
}
