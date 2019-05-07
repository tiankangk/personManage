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
//  提交转正申请人申请的信息
export const addTurnFormal = params =>{
    return axios.post(baseURL + 'addTurnFormal', params).then(res => res.data);
}

// 获取晋升审核的员工信息
export const getEmployeeUpInfo = params =>{
    return axios.post(baseURL + 'getEmployeeUpInfo', params).then(res => res.data);
}
// 提交晋升审批
export const addEmployeeUpAudit = params =>{
    return axios.post(baseURL + 'addEmployeeUpAudit', params).then(res => res.data);
}
// 获取加薪审核的员工信息
export const getPayRiseInfo = params =>{
    return axios.post(baseURL + 'getPayRiseInfo', params).then(res => res.data);
}
// 提交加薪审批
export const addPayRiseAudit = params =>{
    return axios.post(baseURL + 'addPayRiseAudit', params).then(res => res.data);
}
// 获取请假审核的员工信息
export const getApplyLeaveInfo = params =>{
    return axios.post(baseURL + 'getApplyLeaveInfo', params).then(res => res.data);
}
// 提交请假审批
export const addApplyLeaveAudit = params =>{
    return axios.post(baseURL + 'addApplyLeaveAudit', params).then(res => res.data);
}
// 获取请假已审批的员工信息
export const getApplyLeaveAgreeInfo = params =>{
    return axios.post(baseURL + 'getApplyLeaveAgreeInfo', params).then(res => res.data);
}
// 提交销假申请
export const addSellingOff = params =>{
    return axios.post(baseURL + 'addSellingOff', params).then(res => res.data);
}
// 获取未审核的数量
export const getUnAuditCount = () =>{
    return axios.get(baseURL + 'getUnAuditCount').then(res => res.data);
}
// 获取转正审核的员工信息
export const getTurnFormalInfo = (params) =>{
    return axios.post(baseURL + 'getTurnFormalInfo',params).then(res => res.data);
}
// 提交转正申请
export const addTurnFormalAudit = (params) =>{
    return axios.post(baseURL + 'addTurnFormalAudit',params).then(res => res.data);
}

// 添加公司
export const addcompany = (params) =>{
    return axios.post(baseURL + 'addcompany',params).then(res => res.data);
}
// 获取公司信息
export const getCompanyInfo = () =>{
    return axios.get(baseURL + 'getCompanyInfo').then(res => res.data);
}
// 改变公司的状态
export const changeCompanyStauts = (params) =>{
    return axios.post(baseURL + 'changeCompanyStauts',params).then(res => res.data);
}
// 获取下拉选项公司的信息
export const getSelectCompanyInfor = (params) =>{
    return axios.post(baseURL + 'getSelectCompanyInfor',params).then(res => res.data);
}














