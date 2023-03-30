import React, { useState,useEffect, useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

function POSPage() {
    //state to hold products retrieved from backend
    const [products, setProducts] = useState([])
    //state to hold loading status
    const [isLoading, setIsLoading] = useState(false)
    //state to hold cart
    const [cart, setCart] = useState([])
    //state to hold total amount
    const [totalAmount, setTotalAmount] = useState(0)

    //toast display options
    const toastOptions = {
        autoClose : 500,
        pauseOnHover: true,
    }


    


    //fetch products from backend api
    const fetchProducts = async () => {
        setIsLoading(true)
        const result = await axios.get("https://store-data-api.vercel.app/products")
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
            toast(`${product.name} Added to cart`,toastOptions)
        }else{
            let addProduct = {
                ...product,
                "quantity": 1,
                "totalAmount": product.price
            }
            setCart([...cart, addProduct])
            toast(`${product.name} Added to cart`, toastOptions)
        }
    }

    //remove product from cart
    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.id !== product.id)
        setCart(newCart)
    }


    const componentRef = useRef()

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handlePrint = () => {
        handleReactToPrint()
    }



    //fetch products on component mount
    useEffect(() => {
        fetchProducts()
    }, [])

    //calculate total amount
    useEffect(() => {
        let newTotalAmount = 0
        cart.forEach(cartItem => {
            newTotalAmount = newTotalAmount + parseInt(cartItem.totalAmount)
        })
        setTotalAmount(newTotalAmount)
    }, [cart])




    
    return (
        <div>
            <MainLayout>
                <div className="row">
                    <div className="col-lg-8">
                        {isLoading ? "Loading..." : <div className="row">
                            {products.map((product, key) => 
                                <div key={key} className= "col-lg-4 mb-4">
                                    <div className="pos-item px-3 text-center border" onClick={() => addProductToCart(product)}>
                                        <p>{product.name}</p>
                                        <img src={product.image} alt={product.name} className="img-fluid" />
                                        {/* <p>${product.price}</p> */}

                                        <p>${(product.price / 100).toFixed(2)}</p>

                                    </div>
                                </div>
                            )}  
                            </div>
                        }                            
                    </div>
                    <div className="col-lg-4">
                        <div style={{display: "none"}}>
                            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
                        </div>
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
                                        <td>${(cartProduct.price / 100).toFixed(2)}</td>
                                        <td>{cartProduct.quantity}</td>
                                        <td>${(cartProduct.totalAmount / 100).toFixed(2)}</td>
                                        <td><button className="btn btn-danger btn-sm" onClick={() => removeProduct(cartProduct)}>Remove</button></td>
                                    </tr>
                                    ) : "No products in cart"}                            
                                </tbody>
                            </table>
                            {/* <h2 className="px-2 text-white">Total Amount: ${totalAmount}</h2> */}
                            <h2 className="px-2 text-white">Total Amount: ${(totalAmount / 100).toFixed(2)}</h2>
                            
                        </div>

                        <div className="mt-3">
                            {totalAmount !== 0 ? 
                                <div>
                                    <button className="btn btn-primary" onClick={handlePrint}>
                                        Pay Now
                                    </button>
                                </div> : "Please add products to cart"
                            }
                        </div>

                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default POSPage