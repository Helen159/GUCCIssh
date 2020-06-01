$(document).ready(function(){	
	/**
	  * 验证码
	  * @param {Object} o 验证码长度
	  */
	$.fn.code_Obj = function (o) {
		var _this = $(this);
		var options = {
			code_l: o.codeLength,//验证码长度
			codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
				'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
				'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			],
			codeColors: ['#f44336', '#009688', '#cddc39', '#03a9f4', '#9c27b0', '#5e4444', '#9ebf9f', '#ffc8c4', '#2b4754', '#b4ced9', '#835f53', '#aa677e'],
			code_Init: function () {
				var code = "";
				var codeColor = "";
				var checkCode = _this.find("#data_code");
				for (var i = 0; i < this.code_l; i++) {
					var charNum = Math.floor(Math.random() * 52);
					code += this.codeChars[charNum];
				}
				for (var i = 0; i < this.codeColors.length; i++) {
					var charNum = Math.floor(Math.random() * 12);
					codeColor = this.codeColors[charNum];
				}
				console.log(code);
				if (checkCode) {
					checkCode.css('color', codeColor);
					checkCode.className = "code";
					checkCode.text(code);
					checkCode.attr('data-value', code);
				}
			}
		};

		options.code_Init();//初始化验证码
		_this.find("#data_code").bind('click', function () {
			options.code_Init();
		});
	};
	/**
 * 验证码
 * codeLength:验证码长度
 */
	$('#check-code').code_Obj({
		codeLength: 5
	});


	//提交注册
	$('[name="res"]').click(function () {
		// console.log(123);

		let username = $('[name="username"]').val();
		let userpwd1 = $('[name="userpwd"]').val();
		let userpwd2 = $('[name="userpwd2"]').val();
		let uservc = $('[name="vc1"]').val();
		// console.log(uservc);

		// let uservc2 = $('[name="vc2"]').html();
		// console.log(uservc2);

		//判断验证发是否相同
		// 两个验证码必须一致
		if (userpwd1 !== userpwd2) {
			window.alert('两次密码不一致');
			return false;
		}

		// 判断验证码
		if (uservc.toLowerCase() !== $('[name="vc2"]').html().toLowerCase()) {
			window.alert('验证码不正确');
			return false;
		}

		// 发送ajax请求给PHP程序
		// 请求方式是 post , 传参是账号密码两个数据
		// 注册成功,返回值是1,注册失败,返回值是0
		// console.log(username,userpwd1);
		
		$.ajax({
			url: '../server/reg.php',
			type: 'post',
			data: { userName: username, userPwd: userpwd1 },
			dataType: 'json',
			success: function (res) {

				if (res == '1') {
					window.alert('注册成功,点击确定,跳转首页');
					window.location.href = '../pages/index.html';

					let str = decodeURIComponent(window.location.search);
					str = str.substr(1);
					


				} else if (res == '0') {
					window.alert('注册失败，用户名重复');
				}
			}
		})
	})

})

