import axios,{AxiosError} from 'axios';

export const api = axios.create({
  baseURL: "http://192.168.0.9:4000"
});

export function request<AuthorizationResponse>(url: string,config: RequestInit = {}): Promise<AuthorizationResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as AuthorizationResponse);
}

export {AxiosError}