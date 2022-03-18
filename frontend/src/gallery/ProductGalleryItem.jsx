import "./ProductGalleryItem.css"
import { Link } from "react-router-dom"

const ProductGalleryItem = ( {product} ) => {
    return (
        <div className="ProductGalleryItem">
            <Link className="link-gallery-item" to={`/details/${product._id}`}>
                <img className="img-product" src={product.productImage} alt="productImage" />
                <div className="container-product-info">
                    <p id="name">{product.productName}</p>
                    <p>${product.productPrice}</p>
                    <p>{product.dateCreated.substring(0, 10)}</p>

                </div>
            </Link>
        </div>
    )
}

export default ProductGalleryItem