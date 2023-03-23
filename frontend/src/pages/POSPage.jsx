import React, { useState,useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'

function POSPage() {
    //state to hold products
    const [products, setProducts] = useState([])


    //fetch products from backend api
    const fetchProducts = async () => {
        const result = await axios.get('products')
        setProducts(await result.data)
    }
    
    //fetch products on component mount
    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <div>
            <MainLayout>
                POS Content
            </MainLayout>

        </div>
    )
}

export default POSPage