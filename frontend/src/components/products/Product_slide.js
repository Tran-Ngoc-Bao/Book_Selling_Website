import React, { useState } from 'react';
import Product_card from './Product_card';
// import data tu API duoi dang mang cac json
const dummyProducts = [
    {
        img: 'https://picsum.photos/200/200',
        name: 'Product 1',
        author: 'Author 1',
        rating: '4.5',
        sold: '100',
        price: '$19.99',
        id: '1'
    },
    {
        img: 'https://picsum.photos/200/200',
        name: 'Product 2',
        author: 'Author 2',
        rating: '4.0',
        sold: '50',
        price: '$29.99',
        id: '2'
    },
    {
        img: 'https://picsum.photos/200/200',
        name: 'Product 3',
        author: 'Author 3',
        rating: '4.2',
        sold: '80',
        price: '$24.99',
        id: '3'
    }
];

const RenderSlide = (props) => {
    return dummyProducts.slice(props.start,props.end+1).map((product) => (
        <Product_card key={product.id} product={product} />
    ));
};

function Product_slide() {
    const [startindex, setstartIndex] = useState(0);
    const [endindex, setendIndex] = useState(startindex+1);
    

    const incrementCount = () => {
        if (endindex < dummyProducts.length - 1) {
            setstartIndex(prevIndex => prevIndex + 1);
            setendIndex(prevIndex => prevIndex + 1);
        }
    };

    const decrementCount = () => {
        if (startindex > 0) {
            setstartIndex(prevIndex => prevIndex - 1);
            setendIndex(prevIndex => prevIndex - 1);
        }
    };
    return (
        <div className='container'>
            <RenderSlide start={startindex} end={endindex} />
            <div className='button'>
            {startindex >0 && <button  onClick ={decrementCount}>previous</button>}
            {endindex <dummyProducts.length-1 &&<button  onClick ={incrementCount}>next</button>}
            </div>
    </div>
    );
}

export default Product_slide