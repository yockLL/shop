let unloginUl = document.querySelector("#unlogin-ul");
let loginUl = document.querySelector("#login-ul");
let usernameSpan = document.querySelector("#username-span");
let username = tools.cookie("username");
let quit = document.querySelector("#quit");
if(username) {
	unloginUl.classList.add("hidden");
	usernameSpan.innerHTML = username;
	loginUl.classList.remove("hidden");
}

quit.onclick = function () {
	tools.cookie("username", username, {expires: -1, path: "/"});
	window.location.href = "html/login.html";
}
