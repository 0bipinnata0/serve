import { request } from 'umi';

export async function fake_tasks() {
  return request<API.Faketasks>('/tasks/getTasks');
}

export async function deleteNode(id: string) {
  return request<API.Faketasks>('/tasks/deleteTask', {
    params: { id },
  });
}
