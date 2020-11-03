import {request} from "./request";

export async function getHomeMultidata(){
  return await request({
    url:'/api/w6/home/multidata'
  })
}

export async function getHomeGoods(type,page){
  return await request({
    url:'/api/w6/home/data',
    params:{
      type,
      page
    }
  })
}



