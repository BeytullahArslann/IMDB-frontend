/* eslint-disable */
import axios from 'axios';

var apiLink = "https://localhost:7084/"
export const HTTP = axios.create({
  baseURL: apiLink,
})
