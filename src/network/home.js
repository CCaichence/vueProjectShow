import {request} from "./request";

export async function getHomeMultidata(){
  return await request({
    url:'/home/multidata'
  })
}

export async function getHomeGoods(type,page){
  return await request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}



