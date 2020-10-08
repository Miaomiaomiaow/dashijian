$(() => {
    let layer = layui.layer
    getuserinof();
    $("#btnLogOut").on("click", () => {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
//全局变量
function getuserinof() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token") || "",
        },
        success: res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            renderAvater(res.data)
        }
    })
}
function renderAvater(user) {
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    }
    else {
        $(".layui-nav-img").hide();
        let text = name[0].toUpperCase()
        $(".text-avatar").show().html(text);
    }
}