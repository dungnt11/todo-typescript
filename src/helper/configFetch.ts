import { fetchXD } from './fetch-c';

const fetchInstance = fetchXD.create();
fetchInstance.config.baseURL = 'http://localhost:3002';

export { fetchInstance };