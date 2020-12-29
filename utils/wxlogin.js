
/*
微信登录
	返回 code
*/
export const wxlogin = ()=> {
	return new Promise((resolve, reject)=>{
		uni.showLoading({
		  title: '登录中...'
		});
		
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				resolve(loginRes.code);
				uni.hideLoading();
			},
			fail(err) {
				reject(err)
				uni.hideLoading();
			}
		})
		
	})
}

/*
获取微信用户信息 要先调用登录接口
	返回用户信息
*/
export const wxUserInfo = ()=>{
	return new Promise((resolve, reject)=>{
		uni.getUserInfo({
			provider: 'weixin',
			success: function(res) {
				resolve(res);
			},
			fail(err) {
				reject(err)
			}
		});
	})
}

/*
获取微信用户手机号 要先调用登录接口
	参数:obj{
		sessionkey,
		ivdata,
		encrypdata
	}
	返回手机号相关信息
	
*/
export const getPhone = (obj)=>{
	return new Promise((resolve, reject)=>{
		getphone(obj).then(res=>{
			resolve(JSON.parse(res.data.data.phone))
		},err=>{
			reject(err)
		})
	})
}




// 接口获取 sessionkey
export const htxcx = (appid,secret,code)=>uniAjax("https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code")

// 解密手机号
export const getPhone = (obj)=>{}


export function uniAjax(url,params,method){
	var method = method || "GET"
	// 处理特殊字符
	return new Promise((resolve, reject)=>{
		try{
			uni.request({
				url:url,
				data:params,
				method:method,
				success:(res)=>{
					resolve(res)
				},
				fail:(fail)=>{
					reject(fail)
				},
				complete:(res)=>{
					// console.log("complete:",res)
				},
			})
		}catch(e){
			reject(e)
		}
		
	})
}


