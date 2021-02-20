import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent(token: string = '') {
  return request<API.CurrentUser>('/user/currentUser', {
    // method: 'POST',
    headers: {
      token,
    },
  });
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
