import axios from "axios";
import './Details.css';
import { Button, Comment, Form} from 'semantic-ui-react';
import { useAuth } from "../common/AuthContext"
import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Constant from "../common/Constant"
import 'semantic-ui-css/semantic.min.css'

const Details = () => {
    const { currentUser, logoutUser } = useAuth()
    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})
    const [commentList, setCommentList] = useState([])
    const [comment, setComment] = useState("")
    const [error, setError] = useState('')
    const [tag, setTag] = useState(1)

    const handleCommentChange = (comment) => {
        axios.get(`${Constant.API_BASE}/users?where={"uid":"${currentUser.uid}"}`)
            .then(res => {
                var commenterName = res.data.data[0].name
                setComment(commenterName + '#' + new Date().toDateString() + '#' +comment);
            })
        
        
    }

    const fetchProducts = async () => {
        if(window.location.href.slice(7,8)==='l'){
            var productAddress = `${Constant.API_BASE}/products` + window.location.href.slice(29)
        }
        else{
            var productAddress = `${Constant.API_BASE}/products` + window.location.href.slice(32)
        }
        axios.get(productAddress)
            .then(productResponse => {
                var sellerAddress = `${Constant.API_BASE}/users/`+productResponse.data.data.sellerID
                axios.get(sellerAddress)
                    .then(sellerPesponse => {
                        setUser(sellerPesponse.data.data);
                    }).catch((error) => {
                        user: {}
                    });
                setProduct(productResponse.data.data)
                setCommentList(productResponse.data.data.commentList) // do not know why...
            }).catch((error) => {
                setProduct({})
            });
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setError('')
        if (comment === ""){
            return setError("Please make a comment.")
        }

        try{
            product.commentList.push(comment)
            let newProduct = {
                commentList: product.commentList
            }
            const resp = await axios.put(`${Constant.API_BASE}/products/${product._id}`, newProduct)
            setTag(tag+1)
            console.log(resp)
        } catch (err) {
            console.log(err.message)
        }
    }


    useEffect (() => {
        fetchProducts()
    }, [useLocation(), tag])

    var verified = ""
    if(user.verified){
        verified = "Yes"
    }else{
        verified = "No"
    }
    
    return (
        <div className="div">
            <section id = "intro">
                <div>
                    <img id="photo" src={product.productImage}/>
                    {/* <img src="https://assets.nintendo.com/image/upload/b_white,c_pad,f_auto,h_382,q_auto,w_573/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image03?v=2021112423"/> */}
                    <h1>{product.productName}</h1>
                    <h1>Price: {product.productPrice} dollars</h1>
                    <p className="lead">{product.productDescription}</p>
                </div>
            </section>
            <section id = "seller-info">
                <img src={user.profileImage}/>
                <div className="ui card">
                    <div className="content">
                        <div className="head">{user.name}</div>
                        <div className="meta">UIUC student/faculty certification: {verified}</div>
                        {currentUser
                            ?
                            <div className="description">Cell phone: {user.phoneNumber}<br></ br>Email: {user.email}</div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </section>
            <section id="comments">
            {currentUser 
                ? 
                <div>
                    <Comment.Group>
                        {commentList.map(function(comment, i){
                            return(
                                <Comment key = {i}>
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.split("#")[0]}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{comment.split("#")[1]}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{comment.split("#")[2]}</Comment.Text>
                                    </Comment.Content>
                                </Comment>  
                            )
                        }
                        )}
                    </Comment.Group>
                    <Form reply>
                        <Form.TextArea 
                        placeholder="Write your comments here." 
                        onChange={event => handleCommentChange(event.target.value)}
                        />
                        <Button 
                        content='Add Comment' 
                        labelPosition='left' 
                        icon='edit' 
                        onClick={handleUpload}
                        primary />
                    </Form>
                </div>
                :
                <div>
                    <Form reply>
                        <Form.TextArea 
                        placeholder="Write your comments here." 
                        />
                        <Button
                        id="disabled-button" 
                        content='Add Comment' 
                        labelPosition='left' 
                        icon='edit' 
                        primary />
                    </Form>
                </div>
            }
            </section>
        </div>
    );
}

export default Details;
