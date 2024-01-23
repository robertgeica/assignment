import axios from 'axios';
import { Book } from '../types';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export async function sendRequest(url: string, { arg }: { arg: Book }) {
  return axios.post(url, arg);
}

export async function sendUpdateRequest(url: string, { arg }: { arg: Book }) {
  return axios.put(url, arg);
}

export async function sendDeleteRequest(url: string) {
  return axios.delete(url);
}
