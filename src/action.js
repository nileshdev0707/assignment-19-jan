import axios from "axios"

// API to fetch products list
const fetchProductsList = () => {
  return axios.get("https://dummyjson.com/products")
}

// This function is deleting products that were stored in the useState and also handling
// the local storage to manage previously deleted products.
const deleteProduct = (productId, allProducts) => {
  const deletedProductList = localStorage.getItem('deletedProductList')
  const productThatBeenDeleted = allProducts.filter((item) => item.id === productId)[0].id
  
  const updatedProductList = allProducts.filter((item) => item.id !== productId)

  if(deletedProductList){
    const idArr = deletedProductList.split(",")
    idArr.push(productThatBeenDeleted.toString())
    localStorage.setItem("deletedProductList", idArr)
    return updatedProductList
  } else {
    localStorage.setItem("deletedProductList", [productThatBeenDeleted])
  }
  return updatedProductList
}

export {
  fetchProductsList,
  deleteProduct
}