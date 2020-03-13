import  axios  from 'axios';

console.log('process.env.NODE_ENV', process.env.NODE_ENV );
console.log('process.env.API_HOST', process.env.API_HOST )


axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = '';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });