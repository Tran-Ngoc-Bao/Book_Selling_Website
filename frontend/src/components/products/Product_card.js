import React from 'react'
// have link to product-page (chua implement)
function Product_card({product}) {
  return (
    <div className="productCard_container">
            <div className="productContent">
                <img src={product.img} alt="place-holder"/>
                <p>Product Name: {product.name}</p>
                <p>Author Name: {product.author}</p>
                <p>Rating: {product.rating}</p>
                <p>Sold: {product.sold}</p> 
                <p>Price: {product.price}</p>
            </div>
        </div>
  )
}

export default Product_card