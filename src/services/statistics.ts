import { request } from 'umi';

export async function getStatistics(params: { type: string } = { type: 'second' }) {
  return request<API.Faketasks>('/statistics', {
    params,
  });
}
