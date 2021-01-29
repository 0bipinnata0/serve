import { request } from 'umi';

export async function fake_statistics() {
  return request<API.Faketasks>('/api/fake_statistics');
}
