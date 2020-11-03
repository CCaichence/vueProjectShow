import {request} from "./request";


export async function getCategory() {
  return await request({
    url: '/api/w6/category'
  })
}

export async function getSubcategory(maitKey) {
  return await request({
    url: '/api/w6/subcategory',
    params: {
      maitKey
    }
  })
}

export async function getCategoryDetail(miniWallkey, type) {
  return await request({
    url: '/api/w6/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
