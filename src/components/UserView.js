import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"



function UserView({ productsData }) {
  
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    
    const activeProducts = productsData.filter((product) => product.isActive)
    
    setProducts(activeProducts.map(product => {
      return <ProductCard key={product._id} productProp={product} />
    }))
    
  }, [productsData])
  
  return (
    <>
      {products}
    </>
  )
}

export default UserView