class Login {
	constructor () {
		this.inputUserName = document.querySelector("#inputUserName");
		this.inputPassword = document.querySelector("#inputPassword");
		this.btn = document.querySelector("#btn");
		this.checkbox =document.querySelector("#checkbox");
		this.bindEvent();
	}
	
	bindEvent() {
		this.btn.onclick = () => {
			let username = this.inputUserName.value;
			let password = this.inputPassword.value;
			tools.ajax("POST", "../api/v1/login.php", {username, password}, data =>{
				if(data.res_code === 1){
					if(this.checkbox.checked){
						tools.cookie("username", username, {expires: 7, path: "/"});
					}else{
						tools.cookie("username", username, {path: "/"});
					}
					alert(data.res_message);
					window.location.href = "../index.html";
				}
			})
			return false;
		}
	}
}

new Login();
