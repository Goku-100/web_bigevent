// 切换注册登录面板
$('.change-panel').click(function () {
    $('.login-panel').toggle()
    $('.reg-panel').toggle()
})

layui.form.verify({
    pwd: [/^[\S]{6,10}$/, '请输入6-10位非空字符串'],
    repwd: function (value) {
        if ($('.reg-form [name=password]').val() !== value) {
            return '请确认两次密码是否一致'
        }
    }
})

// 注册
$('.reg-form form').submit(function (e) {
    e.preventDefault()
    const params = $(this).serialize()
    $.ajax({
        url: '/api/reguser',
        method: 'POST',
        data: params,
        success: res => {
            // 提示用户
            layer.msg(res.message)
            if (res.status === 0) {
                // 清空form表单
                this.reset()
                // 切换面板
                $('.reg-form .change-panel').click()
            }
        }
    })
})

// 登录
$('.login-form form').submit(function (e) {
    e.preventDefault()
    const params = $(this).serialize()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: params,
        success: res => {
            // 提示用户
            layer.msg(res.message)
            if (res.status === 0) {
                // 存储
                localStorage.setItem('token', res.token)
                // 跳转到首页
                location.href = '/index.html'
            }
        }
    })
})