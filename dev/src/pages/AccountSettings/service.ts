import { request } from 'umi';

export async function queryCurrent() {
  return request('/api/currentUser');
}
