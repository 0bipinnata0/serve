import { request } from 'umi';

export async function fakeChartData() {
  return request('/head');
}

export async function fakeTasks() {
  return request('/api/fake_tasks');
}
