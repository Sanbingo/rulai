import request from '@/utils/request';
const API_PATH = '/api'

export async function queryListData(params) {
  return request(`${API_PATH}/meta/list`, {
      method: 'POST',
      data: { ...params }
  });
}
export async function queryOneRecordData(params) {
  return request(`${API_PATH}/meta/record`, {
      method: 'POST',
      data: { ...params }
  });
}
export async function saveNewData(params) {
  return request(`${API_PATH}/meta/save`, {
      method: 'POST',
      data: { ...params }
  });
}
