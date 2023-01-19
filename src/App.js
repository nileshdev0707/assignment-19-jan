import { useEffect, useState } from 'react';
import './App.css';
import { deleteProduct, fetchProductsList } from './action';
import { mapProducts } from './utils';

const App = () => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    if (products.length) return
    fetchProductsList().then((response) => {
      const arrangedProduct = mapProducts(response?.data?.products)
      setProducts([...arrangedProduct])
    })
  },[])
  
  const handleDeleteProduct = (productId) => {
    const productIsRemoved = deleteProduct(productId, products)
    // API to remove a product and managing the products that were removed
    setProducts(productIsRemoved)
  }

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <p className="text-gray-500 text-lg">
        React and Tailwind CSS in action
      </p>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Product List Demo</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <>
              <div className="group relative" key={product.id}>
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.thumbnail}>
                        <span aria-hidden="true" className="" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  <div>
                    <button className="bg-red-700 rounded-md p-2.5 text-white" id={`delete_${product.id}`} type="button" onClick={() => handleDeleteProduct(product.id)}>delete</button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
