const mapProducts = (dataList) => {
  let productsData = [];
  const previouslyDeletedProducts = (localStorage.getItem('deletedProductList'))?.split(",");
  
  [...dataList].map((item, key) => {
    const productData = {...item}
    productsData.push(productData)
  })
  // removing previously deleted products
  productsData = productsData.filter(one => !previouslyDeletedProducts?.find(two => one.id == two));
  return productsData
}

export {
  mapProducts
}