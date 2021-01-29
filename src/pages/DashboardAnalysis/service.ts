import { request } from 'umi';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function fakeTasks() {
  return request('/api/fake_tasks');
}
