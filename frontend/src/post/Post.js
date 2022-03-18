import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { storage } from "../common/firebase"
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage"
import { useAuth } from "../common/AuthContext"
import axios from "axios"
import Constant from "../common/Constant"
import './Post.css'

const Post = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productDescription, setProductDescription] = useState('')
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    
    const handleUpload = async (e) => {
        e.preventDefault()
        setError('')
        if (!productName || !productPrice || !productDescription || !image){
            return setError("Please submit all info")
        }

        try{
            const imageRef = ref(storage, `${currentUser.email}/${Date.now()}-${image.name}`)
            const uploadResult = await uploadBytes(imageRef, image)
            console.log("Image uploaded")
            const imageUrl = await getDownloadURL(imageRef)
            console.log(imageUrl)
            let newProduct = {
                name:  productName,
                description: productDescription,
                price: parseInt(productPrice),
                image: imageUrl,
                sellerID: currentUser.uid
            }
            const resp = await axios.post(`${Constant.API_BASE}/products`, newProduct)
            navigate(`/details/${resp.data.data._id}`)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="Post">
            <div className="container-post">
                <form className="form-post">
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input type="text" name="productName" onChange={e => setProductName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Product Price</label>
                        <input type="text" name="productPrice" onChange={e => setProductPrice(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productDescription">Product Description</label>
                        <textarea name="productDescription" onChange={e => setProductDescription(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productImage">Upload Product Image</label>
                        <input type="file" name="productImage" onChange={handleChange}/>
                    </div>
                </form>
                <Link to="" className="link-submit" onClick={handleUpload}> Submit</Link>
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}

export default Post
