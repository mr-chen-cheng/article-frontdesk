


// 1.定义请求基准路径
axios.defaults.baseURL = 'http://localhost:5433/api/';

// 2.定义请求和响应拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.timeout = 5000; // 设置超时时间 5s， 超时会进入到响应拦截器错误处理
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么 1. 对数据进行二次修改 2.对错误状态码进行统一处理
    console.log('响应拦截器')
    let status = response.status;
    // console.log(response)
    if((status >= 200 && status<300) ||  status == 304 ){
        // 成功 resolve
        let {errcode,message} = response.data;
        switch(errcode){
            case 10002:
                // 弹窗提示用户 
                console.log(message)
                break;
            case 10003:
                // 弹窗提示用户 
                console.log(message)
                break;
            case 10004:
                // 弹窗提示用户 
                console.log(message)
                break;
            default:
                break;
        }
        return response.data;
    }else{
        // 失败 reject，传递参数响应对象response
        return Promise.reject(response);
    }
    
  }, function (error) {
    if(!error.response){
        return {message:'请求错误：如超时，地址写错'}
        // return Promise.reject(error);
    }
    let status = error.response.status; // 401权限错误  404请求错误 500服务器错误 其他 
    switch(status){
        case 401:
            // 打回登录
            console.log('401 没权限，打回登录页');
            break;
        case 404:
            console.log('404 请求错误，回首页');
            break;
        case 500:
            console.log('500 服务器异常');
            break;
        default:
            console.log('其他错误');
            break;
    }
     return Promise.reject(error); // 抛出错误，控制台会看到详细错误信息
    // return {}    
});

