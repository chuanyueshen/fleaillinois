import { Link } from 'react-router-dom'
import ProductListItem from './ProductListItem'
import { useAuth } from '../common/AuthContext'
import './User.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Constant from '../common/Constant'

const User = () => {
    const { currentUser } = useAuth()
    const [selling, setSelling] = useState([])
    const [loading, setLoading] = useState(true)

    const getUserSelling = async () => {
        try {
            let resp = await axios.get(`${Constant.API_BASE}/products?where={"sellerID":"${currentUser.uid}"}`)
            setSelling(resp.data.data)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
            getUserSelling()
    }, [])

    return (
        <div className="user">
            <div className="container-user-history">
                <div className="container-user-tabs">
                    {/* <Link to='/' className='link-user-tabs'>My Purchase</Link> */}
                    <h3 className='link-user-tabs'>My Sell</h3>
                </div>
                <div className="container-products-list">
                    {!loading && selling.map((product) => (
                        <ProductListItem key={product._id} product={product}/>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default User