import api from '../config/AxiosConfig';

export async function getFurniture(skip = 0, limit = 20, category = '') {
  let url = `/furniture?skip=${skip}&limit=${limit}`;
  if (category) url += `&category=${category}`;
  const res = await api.doGet(url);
  return res.data;
}

export async function getFurnitureById(id) {
  const res = await api.doGet(`/furniture/${id}`);
  return res.data;
}

export async function createFurniture(data) {
  const res = await api.doPost('/furniture/', data);
  return res.data;
}

export async function updateFurniture(id, data) {
  const res = await api.doPut(`/furniture/${id}`, data);
  return res.data;
}

export async function deleteFurniture(id) {
  await api.doDelete(`/furniture/${id}`);
}

export async function getFurnitureCategories() {
  const res = await api.doGet('/furniture/categories');
  return res.data;
}

export async function searchFurniture(term = '', category = '', min_price = '', max_price = '', skip = 0, limit = 20) {
  let url = `/furniture/search?term=${term}&skip=${skip}&limit=${limit}`;
  if (category) url += `&category=${category}`;
  if (min_price) url += `&min_price=${min_price}`;
  if (max_price) url += `&max_price=${max_price}`;
  const res = await api.doGet(url);
  return res.data;
}
