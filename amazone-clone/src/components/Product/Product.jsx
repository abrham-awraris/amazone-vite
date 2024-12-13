import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
import Loader from '../../components/Loader/Loder'
function Product() {
    const [products, setProducts] = useState()
   const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      setIsLoading(true)
      axios.get('https://fakestoreapi.com/products')
      .then((res)=>{
        setProducts(res.data)
        setIsLoading(false)
      }).catch((err)=>{
        console.log(err)
        setIsLoading(false)
      })
    }, [])
    
  return (

  <>
  {
    isLoading?(<Loader/>) : 
    ( <section className={classes.products_container}>
      {
          products?.map((singleProduct)=>{
            return  <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id}/>
                })
      }
     </section>)
  }
  </>

  )
}

export default Product


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductCard from './ProductCard'; // Ensure this is defined or imported
// import classes from './product.module.css'
// import Loader from '../Loader/Loder'

// function Product() {
//   const [Products, setProducts] = useState([]); // Initialize state as an empty array
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     // Fetch products from API
//     axios
//       .get('https://fakestoreapi.com/products')
//       .then((res) => {
//         setProducts(res.data); // Update state with API data
//         setIsLoading(false)
//       })
//       .catch((err) => {
//         console.error('Error fetching products:', err);
//         setIsLoading(false)
//       });
//   }, []);

//   return (
//     <>
//     {
//         isLoading?(<Loader/>):(<section className={classes.products_container}>
//          {
//             Products.map((singleProduct)=>{
//                 return <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
//             })
//         }
//     </section>)
//     }                   
//     </>
    
//     // <section>
//     //   {Products.map((singleProduct) => (
//     //     <ProductCard Product={singleProduct} key={singleProduct.id} />
//     //   ))}
//     // </section>
//   );
// }

// export default Product;
