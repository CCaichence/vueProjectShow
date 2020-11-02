import {request} from "./request";


export async function getCategory() {
  return await request({
    url: '/category'
  })
}

export async function getSubcategory(maitKey) {
  return await request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export async function getCategoryDetail(miniWallkey, type) {
  return await request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
