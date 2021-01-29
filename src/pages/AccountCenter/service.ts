import { request } from 'umi';

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}
