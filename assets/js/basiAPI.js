let baseurl = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(params => {
    params.url = baseurl + params.url
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    params.complete = res => { //登录拦截
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem("token");
            location.href = "/login.html"
        }
    }
})

