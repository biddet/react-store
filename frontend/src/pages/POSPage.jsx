import React, { useState,useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'

function POSPage() {
    //state to hold products
    const [products, setProducts] = useState([])
    //state to hold loading status
    const [isLoading, setIsLoading] = useState(false)
    //state to hold cart
    const [cart, setCart] = useState([])


    //fetch products from backend api
    const fetchProducts = async () => {
        setIsLoading(true)
        const result = await axios.get('products')
        setProducts(await result.data)
        setIsLoading(false)
    }
    
    const addProductToCart = async (product) => {
        //check if product is already in cart
        let findProductInCart = await cart.find(item =>{
            return item.id === product.id
        })

        if (findProductInCart){
            let newCart =[]
            let newItem

            cart.forEach(cartItem => {
                if (cartItem.id === product.id){
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity +1)
                    } 
                    newCart.push(newItem)
                }else{
                    newCart.push(cartItem)
                }
            })
            setCart(newCart)
        }else{
            let addProduct = {
                ...product,
                "quantity": 1,
                "totalAmount": product.price
            }
            setCart([...cart, addProduct])
        }
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
                                    <div className="border" onClick={() => addProductToCart(product)}>
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
                        <div className="table-responsive bg-dark">
                            <table className="table table-responsive table-dark table-hover">
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Qty</td>
                                        <td>Total</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart ? cart.map((cartProduct, key) => 
                                    <tr key={key}>
                                        <td>{cartProduct.id}</td>
                                        <td>{cartProduct.name}</td>
                                        <td>{cartProduct.price}</td>
                                        <td>{cartProduct.quantity}</td>
                                        <td>{cartProduct.totalAmount}</td>
                                        <td><button className="btn btn-danger btn-sm">Remove</button></td>
                                    </tr>
                                    ) : "No products in cart"}                            
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default POSPage