import axios from 'axios'

let baseURL = '';
if(process.env.NODE_ENV === 'development'){
    baseURL = 'http://localhost:3001/' 
} else {
    baseURL = `http://192.168.0.38:3001/`
}

/**
 * 系统登录接口
 */

 export const pickGoodsLogin = params =>{
    return axios.post(baseURL + 'pickGoodsLogin', params).then(res => res.data);
}

/**
 * 修改密码
 */
export const changePassword = params =>{
    return axios.post(baseURL + 'changePassword', params).then(res => res.data);
}
/**
 * 入职人员信息管理
 */

//  保存人员信息
export const keepEntryRegistration = params =>{
    return axios.post(baseURL + 'keepEntryRegistration', params).then(res => res.data);
}
//  获取入职人员的信息列表
export const getEntryRegistrationInfo = params =>{
    return axios.post(baseURL + 'getEntryRegistrationInfo', params).then(res => res.data);
}
//  编辑时获取员工信息
export const getEditEntryInfo = params =>{
    return axios.post(baseURL + 'getEditEntryInfo', params).then(res => res.data);
}
//  获取预览证件照的地址
export const getEntryPicAdress = params =>{
    return axios.post(baseURL + 'getEntryPicAdress', params).then(res => res.data);
}
//  提交晋升申请人申请的信息
export const addEmployeeUpInfo = params =>{
    return axios.post(baseURL + 'addEmployeeUpInfo', params).then(res => res.data);
}
//  提交加薪申请人申请的信息
export const addPayRise = params =>{
    return axios.post(baseURL + 'addPayRise', params).then(res => res.data);
}
//  提交请假申请人申请的信息
export const addApplyLeave = params =>{
    return axios.post(baseURL + 'addApplyLeave', params).then(res => res.data);
}








