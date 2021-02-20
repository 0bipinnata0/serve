import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
