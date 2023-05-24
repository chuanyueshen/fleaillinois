# Final Project: Flea Illinois
#### The Art of Web Programming
#### December 2021
#### Note: this project was originally done on GitLab. Migirated to GitHub for easier reference.
#### Team HTML5
- Chuanyue Shen
- Wenshan Xiong
- Jerry Nie
- Zewei Long
- Tiancheng Jiang

## Table of Contents
1. [Introduction](#introduction)
2. [Design and functionality](#design-and-functionality)
3. [User flow](#user-flow)
4. [Backend implementation](#backend-implementation)
5. [Frontend implementation](#frontend-implementation)
6. [Getting started locally](#getting-started-locally)

## 1. Introduction
We initialized the Flea Illinois application in observing the increasing demand of saving money and rising awareness of environmental sustainablility. Flea Illinois is a second-hand exchange platform, which aims to offer better experience that cannot be fulfilled by the available applications in the market. Currently, Flea Illinois focuses on serving Champaign-Urbana students and residents. The application may be extended to other regions when applicable. 

## 2. Design and functionality
We assessed the current available applications in the market to supplement our study in designing the functionalities. eBay is one of the biggest platforms for second-hand businesses, but it does not provide user verification that inreases the chance of fake information, nor does it provide convenient local transactions that increase the money spending on mailing. For some local second-hand groups, for example, the Free & For Sale UIUC Facebook group, they do not verify user information as well. Besides, functions like item searching are not user-friendly. 

Based on the assessment as well as considering the user experience, we designed four core functionalities in resolving the problems encountered in current applications:

- **User verification:** New users' identifications will be verified by their email addresses and assigned a verification tag accordingly, which is visible to everybody. Students with univerisity email addresses are assigned an "verified" tag. Local residents are also welcome to use this app but are assigned an "unverified" tag initially until their identities and residences are confirmed. This verification function allows our users to buy, sell, and exchange more transparently, reducing the chances of scam and/or deceived information.

- **Easy post and update:** Registered users can post their items on the Flea Illinois webpage with clear instructions. The post will not be approved if missing information. Product photos can be uploaded and are highly encouraged. When the items are sold, users can mark the product status as sold, which will no longer be shown as available. 

- **Simple search and view:** Users can browse available items in the gallary and also search specific items by keywords. The returned list of items can be sorted by price and/or released date in ascending or descending order. When an item is clicked, detailed informatioin about the product will be displayed.

- **Message board:** Registered users if interested in the products can leave messages in the message board at the product details page. The sellers can reply and answer any questions accordingly. This functionality offers a seamless interaction between the buyers and the sellers without disturbing the private contact information before making purchase decision. 

- **Responsive Design:** This app has been tested with screen resolutions 1920 x 1080, 1366 x 768 and 1280 x 720. 

## 3. User flow
![User flow](https://gitlab.com/JerryNie/fleaillinois/-/blob/staging/user_flow.png)

## 4. Backend implementation

#### Access via http://3.145.57.231:4000/

This is not the hosted page of our project, this is only for backend. 

#### Tools/framework

**Database service:** 
- MongoDB Atlas

**API framework:** 
- Node
- Express
- Mongoose

#### Data schema

**Here is the User Schema:**

1. "name" - String
2. "email" - String
3. "verified" - Boolean
4. "phoneNumber" - String
5. "profileImage" - String - stores the image link

**Here is the Product Schema:**

1. "productName" - String
2. "productDescription"
3. "productPrice" - Number
5. "sellerID" - String
6. "forSell" - Boolean
7. "dateCreated" - Date - should be set automatically by server to present date

### API buildup

We implemented an API with the following end-points (preceded by http://3.145.57.231:4000/). 

| Endpoints| Actions | Intended Outcome                                    |
|----------|---------|-----------------------------------------------------|
| users    | GET     | Respond with a List of users                        |
|          | POST    | Create a new user. Respond with details of new user |
| users/:id| GET     | Respond with details of specified user or 404 error |
|          | PUT     | Replace entire user with supplied user or 404 error |
|          | DELETE  | Delete specified user or 404 error                  |
| products    | GET     | Respond with a List of products                        |
|          | POST    | Create a new product. Respond with details of new product |
| products/:id| GET    | Respond with details of specified product or 404 error  |
|          | PUT     | Replace product information with updated information or 404 error |
|          | DELETE  | Delete specified product or 404 error                  |

**NOTE**: In addition, the API has the following JSON encoded query string parameters for the GET requests to the `users` and `products` endpoints:

| Parameter | Description                                                                                  |
|----------|----------------------------------------------------------------------------------------------|
| where    | filter results based on JSON query                                                           |
| sort     | specify the order in which to sort each specified field  (1- ascending; -1 - descending)     |
| select   | specify the set of fields to include or exclude in each document  (1 - include; 0 - exclude) |
| skip     | specify the number of results to skip in the result set; useful for pagination               |
| limit    | specify the number of results to return                                                      |
| count    | if set to true, return the count of documents that match the query (instead of the documents themselves)                    |

Here are some example queries and what they would return:

| Query                                                                                | Description                                             |
|-----------------------------------------------------------------------------------------|---------------------------------------------------------|
| `http://localhost:4000/api/products`                          | Returns full list of  products                       |
| `http://localhost:4000/api/users`                          | Returns full list of users                       |
| `http://localhost:4000/api/users?where={"_id": "55099652e5993a350458b7b7"}`         | Returns a list with a single user with the specified ID ('_id' will be different) |
| `http://localhost:4000/api/products?where={"forSell": true}`                          | Returns a list of forSell products                       |
| `http://localhost:4000/api/products?where={"_id": {"$in": ["59f930d6b1596b0cb3e82953","5a1b6d7bd72ba9106fe9239c"]}}` | Returns a set of products                                  |
| `http://localhost:4000/api/users?sort={"name": 1}`                                  | Returns a list of users sorted by name                  |
| `http://localhost:4000/api/users?select={"_id": 0}`                                  | Returns a list of users without the _id field           |
| `http://localhost:4000/api/products?skip=60&limit=20`                                   | Returns products number from 61 to 80                            |

**The API is also able to handle any combination of those parameters in a single request**. For example, the following is a valid GET request:

```javascript
http://localhost:4000/api/users?sort={"name": 1}&skip=60&limit=20
```

## 5. Frontend implementation

#### Access via http://3.145.57.231:3000/

This is also the hosted page of our project please visit this page for playing with our project. We deployed our project on Amazon AWS server.  

#### Tools/framework

- Use Firebase for user authentication
- Use React Router for routing
- Use Axios for API calls
- Use PropTypes

#### Features

- **Login page**: where new users can register accounts and existing users can login into their accounts.
- **User page**: where registered users can see the products they are selling or already sold.
- **Post page**: where registered users can post products for sell with product name, price, description, and photo.
- **Gallery view**: that displays all available products for sell. The gallery view also contains filtering attributes where users can search by keywords and sort by price and released date.
- **Detail view**: when an item in the search view or the gallery view is clicked, the app displays the detailed information of the specific product.

#### Routes

| Page | Actions |
|----------|---------|
| login page    | /login        |
| user page     | /user    |
| product detail view  | /details/product:id |
| gallery view      | /         |
| post page       | /post         |


## 6. Getting started locally
1. Clone the repository:
`git clone https://gitlab.com/JerryNie/fleaillinois.git fleaillinois`, then `cd fleaillinois`
2. Install dependencies in both backend and frontend:
`npm install`
3. Start the dev server:
`npm start` or 
`nodemon --exec node server.js` to automatically restart the server on save.
