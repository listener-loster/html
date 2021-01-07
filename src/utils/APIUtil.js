var serverBase='http://120.79.203.2:8088/pc'
//var v1 = serverBase +'/api/v1/'
var v1 = process.env.API+'/api/v1/'

export default {
   // BASE_SERVER_URL: serverBase,
    BASE_SERVER_URL:process.env.API,
    /* 登录url */
    API_URL_LOGIN: v1 + "login",
    /* 查询热销商品 get请求 参数：无*/
    API_URL_CATALOG_PRODUCTS_HOT: v1 + "catalog/product",
    /* 获取用户电子钱包余额 post请求 参数：userId*/
    API_URL_CUSTOMER_Account: v1 + "/account/userAccount",
    /* 用户充值到电子钱包中 post请求 参数：userId, amount充值金额*/
    API_URL_CUSTOMER_Recharge_Account: v1 + "account/recharge",
    /*添加购物车*/
    API_URL_USER_ADD_WISHLIST:v1+"user/add/wishlist",
    /*添加联系人 post请求 参数：userId，name，mobile,address*/
    API_URL_USER_ADD_CONTECT:v1+"user/add/contect",
    /*获取联系人 post请求 参数：userId，name，mobile,address*/
    API_URL_CONTECT:v1+"contect",
    /*删除联系人 post请求 参数：userId*/
    API_URL_USER_REMOVE_CONTECT:v1+"user/remove/contect",
    //修改地址信息 post请求
    API_URL_USER_UPDATE_CONTECT:v1+"user/update/contect",
    //修改密码 post请求
    API_URL_USER_CHANGE_PASSWORD:v1+"user/change/password",
    //修改个人信息 post请求
    API_URL_USER_CHANGE_INFO:v1+"user/update/customer",
    
    API_URL_USER_UPDATE_CONTECT:v1+"order/items/update",
    //购物车
    API_URL_CART: v1 + "cart",
    //联系人
    API_URL_CONTECT:v1+"contect",
    //订单支付
    API_URL_ORDER_PAYMENT:v1+"order/PayMent"
}
