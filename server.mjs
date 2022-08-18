import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

let userBase = [];

app.post('/signup', (req,res) => {

    let body = req.body;

    if(!body.firstname || !body.lastname || !body.email || !body.password ){

        res.status(401).send(
            `All Fields Required, For Example
            
             {
                firstname : "noman",
                lastname : "ahmed",
                email : noman@abc.com,
                password : "1234"
             }
            `)
            return;
        }

        let isFound = false 


        for(let i = 0; i < userBase.length; i++){

            if(userBase[i].email === body.email.toLowerCase()){
                isFound = true
                break;
            }
        }

        if(isFound){
            res.status(401).send(
                {message : "This Email id is Already Registered"})
        }

        let newUser = {

            firstname : body.firstname,
            lastname : body.lastname,
            email : body.email.toLowerCase(),
            password : body.password
        }

        userBase.push(newUser);

        res.status(201).send({ message : "User is Created" })
        return;
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})