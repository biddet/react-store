import React, { useState,useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'

function POSPage() {
    //state to hold products
    const [products, setProducts] = useState([])
    //state to hold loading status
    const [isLoading, setIsLoading] = useState(false)


    //fetch products from backend api
    const fetchProducts = async () => {
        setIsLoading(true)
        const result = await axios.get('products')
        setProducts(await result.data)
        setIsLoading(false)
    }
    
    //fetch products on component mount
    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <div>
            <MainLayout>
                <div className="row">
                    <div className="col-lg-8">
                        {isLoading ? "Loading..." : <div className="row">
                            {products.map((product, key) => 
                                <div key={key} className= "col-lg-4">
                                    <div className="border">
                                        <p>{product.name}</p>
                                        <img src={product.image} alt={product.name} className="img-fluid" />
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                            )}  
                            </div>
                        }                            
                    </div>
                    <div className="col-lg-4">

                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default POSPage