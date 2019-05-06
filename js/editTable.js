class EditTable {
	constructor(tbody) {
	    this.tbody = document.querySelector(tbody);
		this.bindEvents()
	}
	
	bindEvents() {
		this.tbody.onclick = e => {
			let target = e.target;
			let tr = target.parentNode.parentNode;
			let classList = Array.from(target.classList);
			//通过classList数组来判断
			if(classList.includes("btn-edit")){
				this.editBtnClick(tr);
			}else if(classList.includes("btn-del")){
				this.delBtnClick(tr);
			}else if(classList.includes("btn-ok")){
				this.okBtnClick(tr);
			}else if(classList.includes("btn-cancel")){
				this.cancelBtnClick(tr);
			}
		}
	}
	
	editBtnClick(tr){
		//把span的内容给对应的input
		Array.from(tr.querySelectorAll("span")).forEach(span => {
			span.nextElementSibling.value = span.innerHTML;
		})
		//给tr加上edit
		tr.classList.add("edit");
	}
	
	okBtnClick(tr){
		//需要把编辑后的数据发送给后台数据库
		let inputPrice = tr.querySelector(".inputPrice");
		let inputNum = tr.querySelector(".inputNum");
		let id = tr.getAttribute("data-id");
		let price = inputPrice.value;
		let num = inputNum.value;
		//发送更新请求
		tools.ajaxGetPromise("api/v1/ok.php", {id, price, num}).then(data => {
			//console.log(data);
			if(data.res_code === 1){
				alert(data.res_message);
				inputPrice.previousElementSibling.innerHTML = inputPrice.value;
				inputNum.previousElementSibling.innerHTML = inputNum.value;
				//tr移除edit
				tr.classList.remove("edit");
			}else{
				alert(data.res_message);
				//tr移除edit
				tr.classList.remove("edit");
			}
		})

	}
	
	cancelBtnClick(tr){
		//tr移除edit
		tr.classList.remove("edit");
	}
	
	delBtnClick(tr){
		if(confirm("确定要删除吗")){
			//需要发送后台数据库删除
			let id = tr.getAttribute("data-id");
			tools.ajaxGetPromise("api/v1/del.php", {id}).then(data => {
				//console.log(data);
				if(data.res_code === 1){
					alert(data.res_message);
					//后台数据操作完成，前端重新获取
					getShop.init();
				}else{
					alert(data.res_message);
				}
			})
			
		}
	}
}

new EditTable("#tbody");