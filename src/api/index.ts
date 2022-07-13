/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://tgdd-spring.azurewebsites.net/api',
});
