import './ProductListItem.css'
import axios from "axios";
import { React, useState, useEffect } from "react";
import Constant from "../common/Constant"
import { Link, useLocation } from "react-router-dom";

const ProductListItem = ({ product }) => {
    const [error, setError] = useState('')

    const handleUpload = async (e) => {
        e.preventDefault()
        setError('')

        try{
            let newProduct = {
                forSell: false
            }
            const resp = await axios.put(`${Constant.API_BASE}/products/${product._id}`, newProduct)
            console.log(resp)
        } catch (err) {
            console.log(err.message)
        }
        window.location.reload();
    }

    const handleUpload_unsold = async (e) => {
        e.preventDefault()
        setError('')

        try{
            let newProduct = {
                forSell: true
            }
            const resp = await axios.put(`${Constant.API_BASE}/products/${product._id}`, newProduct)
            console.log(resp)
        } catch (err) {
            console.log(err.message)
        }
        window.location.reload();
    }

    const handleUpload_delete = async (e) => {
        e.preventDefault()
        setError('')

        try{
            const resp = await axios.delete(`${Constant.API_BASE}/products/${product._id}`)
            console.log(resp)
        } catch (err) {
            console.log(err.message)
        }
        window.location.reload();
    }


    return (
        <div className="product-list-item">
            <img className="img-product" src={product.productImage} alt="" />
            <div className="product-detail">
                <h2 className='h2-user-product'>{product.productName}</h2>
                <Link to={`/details/${product._id}`} className='link-detail'>View Detail</Link>     
                {product.forSell
                ?
                <Link to='/user' onClick={handleUpload} className='link-detail'>Mark as Sold</Link>       
                :
                <Link to='/user' onClick={handleUpload_unsold} className='link-detail'>Mark as Unsold</Link>  
                }   
                <Link to='/user' onClick={handleUpload_delete} className='link-detail'>Delete</Link>  
                

            </div>
            <p className="product-date">{product.dateCreated.slice(0,10)}</p>
        </div>
    )
}

export default ProductListItem