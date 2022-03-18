/*
 * You generally want to .gitignore this file to prevent important credentials from being stored on your public repo.
 */
module.exports = {
    token : "secret-starter-mern",
    mongo_connection : "mongodb+srv://admin:XXXXX@cluster0.yiemt.mongodb.net/fleaillinois?retryWrites=true&w=majority" //removed the secret key
    //example: mongo_connection : "mongodb+srv://[type-yours]:[type-yours]@[type-yours-web-provided].mongodb.net/test?retryWrites=true"
};
