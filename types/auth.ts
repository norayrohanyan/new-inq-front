export interface ITokens {
  token_type: string;
  access_token: string;
  refresh_token: string;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
}

export interface IResetTokens {
  token_type: string;
  token: string;
  token_expires_at: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface ILoginRequest {
  phone: string;
  password: string;
}

export interface IRegisterRequest {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  url: string;
}

export interface IRegisterResponse {
  next_request_seconds: number;
  link_sent: boolean;
}

export interface ILoginResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  access_token_expires_at: string;
  refresh_token_expires_at: string;
}

export interface ILinkVerifyResponse {
  redirect_url: string;
  tokens: ITokens | IResetTokens;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
}

export interface IEditProfileRequest {
  first_name: string;
  last_name: string;
}

export interface IUpdatePhoneRequest {
  phone: string;
}

export interface IUpdatePasswordRequest {
  password: string;
  new_password: string;
  confirm_password: string;
}

