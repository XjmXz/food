/* 图片加载失败处理 
	that 图片绑定字段所属对象
	dat 图片绑定字段
*/
export const imgErr=(dataArray, index)=>{
	console.log("图片加载失败,载入本地默认图片");
	dataArray[index].avatar ='../../static/tabs/默认头像.jpg';
}
