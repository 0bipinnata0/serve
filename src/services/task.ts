import { request } from 'umi';

export async function fake_tasks() {
  return request<API.Faketasks>('/tasks');
}
