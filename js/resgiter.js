class Resgiter {
	constructor () {
		this.inputUserName = document.querySelector("#inputUserName");
		this.inputPassword = document.querySelector("#inputPassword");
		this.btn = document.querySelector("#btn");
		this.bindEvent();
	}
	
	bindEvent() {
		this.btn.onclick = () => {
			let username = this.inputUserName.value;
			let password = this.inputPassword.value;
			
			//数据验证 （正则）
			//发送请求
			tools.ajax("POST", "../api/v1/resgiter.php", {username, password}, data => {
				console.log(data);
				if(data.res_code === 1){
					alert(data.res_message);
				}else if(data.res_code1 === 0) {	
					alert(data.res_message1);
				}
			})
			
			//return false;
		}
	}
}
new Resgiter();
