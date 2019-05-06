class SelectList {
	
	constructor (tbody) {
		this.tbody = document.querySelector(tbody);
		this.pageIndex = 1;//默认处于第一页
		//count指的是一页的数量（不能被修改）
		Object.defineProperty(this, "count", {
			writable : false,
			value : 4
		})
		this.pageCount = 1;//默认总页数为1（临时赋值）
		this.init();
	}
	
	init() {
		let {pageIndex, count} = this; //解构赋值
		tools.ajaxGetPromise("api/v1/select.php", {pageIndex, count}).then(data =>{
			//console.log(data);
			if(data.res_code === 1){
				this.render(data.res_body.data);
				this.pageCount = data.res_body.pageCount;
				//根据总页数渲染分页
				pagination.render(this);
			}else{
				//若查询失败弹出失败信息
				alert(data.res_message);
			}
		})
	}
	
	render (list) {
		let html = "";
		list.forEach((shop, index)  => {
			html += `<tr data-id="${shop.id}">
			<td>${(this.pageIndex-1)*this.count + index + 1}</td>
			<td>${shop.name}</td>
			<td>
				<span>${shop.price}</span>
				<input type="text" class="inputPrice"/>
			</td>
			<td>
				<span>${shop.num}</span>
				<input type="text" class="inputNum"/>
			</td>
			<td>
				<button class="btn btn-success btn-xs btn-edit">编辑</button>
				<button class="btn btn-danger btn-xs btn-del">删除</button>
				<button class="btn btn-info btn-xs btn-ok">确定</button>
				<button class="btn btn-warning btn-xs btn-cancel">取消</button>
			</td>
		</tr>`;
			
		});
		this.tbody.innerHTML = html;
	}
}

let getShop = new SelectList("#tbody");