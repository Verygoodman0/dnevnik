import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4443',
});

export default instance;