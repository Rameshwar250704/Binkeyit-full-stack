

export const baseURL=import.meta.env.VITE_API_URL

const SummaryApi={
    register:{
        url:"/api/user/register",
        method:'post'
    },
    login:{
        url:"/api/user/login",
        method:'post'
    },
    userDetails:{
        url:"/api/user/userDetails",
        method:'get'
    },
    logout:{
        url:"/api/user/logout",
        method:"post"
    },
    uploadAvatar:{
        url:"/api/user/upload-avatar",
        method:"put"
    },
    updateUser:{
        url:"/api/user/update-user",
        method:"put"
    },
    addCategory:{
        url:"/api/category/add_category",
        method:"post"
    },
    uploadImage:{
        url:"/api/file/upload",
        method:"post"
    },
    getCategory:{
        url:"/api/category/get",
        method:"get"
    },
    updateCategory:{
        url:"/api/category/update",
        method:"put"
    },
    createSubCategory:{
        url:'/api/subcategory/create',
        method:"post"
    },
    getSubCategory:{
        url:"/api/subcategory/get",
        method:"post"
    },
    createProduct:{
        url:"api/product/create",
        method:'post'
    },
    getProduct:{
        url:"api/product/get",
        method:"post"
    },
    getProducByCategory:{
        url:"api/product/get-product-by-category",
        method:"post"


    },
    getProductByCategorySubCategory:{
        url:"/api/product/get-product-by-category-and-subcategory",
        method:"post"
    },
    getProductDetails:{
        url:"/api/product/get-product-details",
        method:"post"
    },
    searchProduct:{
        url:"/api/product/search-product",
        method:"post"
    },
    addTocart:{
        url:"/api/cart/create",
        method:"post"
    },
    getCartItem:{
        url:"/api/cart/get",
        method:"get"
    },
    updateCartItemQty:{
        url:"/api/cart/update-qty",
        method:"put"
    },
    deleteCartItem:{
        url:"/api/cart/delete-cart-item",
        method:"delete"
    },
    createAddress : {
        url : '/api/address/create',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update',
        method : 'put'
    },
    disableAddress : {
        url : '/api/address/disable',
        method : 'delete'
    },
    CashOnDeliveryOrder : {
        url : "/api/order/cash-on-delivery",
        method : 'post'
    },
    payment_url : {
        url : "/api/order/checkout",
        method : 'post'
    },
    getOrderItems : {
        url : '/api/order/order-list',
        method : 'get'
    }
}

export default SummaryApi