$(() => {
    $("#link-reg").on('click', () => {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link-login").on('click', () => {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    let form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,16}$/, '密码必须6-16位'],
        repwd: value => {
            let pwd = $(".reg-box input[name=password]").val();
            if (pwd !== value) {
                $(".reg-box input[name=repassword]").val('')
                return '两次密码不一致'
            }
        }
    })
    let layer = layui.layer;
    $("#form-reg").on("submit", e => {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                $("#link-login").click();
                $('.reg-box input[name=username]').val('');
                $('.reg-box input[name=password]').val('');
                $(".reg-box input[name=repassword]").val('');
            }
        })
    })
    $("#form-login").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                localStorage.setItem("token", res.token);
                location.href = "/index.html"
            }
        })
    })
})