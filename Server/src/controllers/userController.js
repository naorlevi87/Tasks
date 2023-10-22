import jwt from 'jsonwebtoken'

const login =  (req,res)=> {
    //console.log(req.body);
    if(req.body.password === process.env.PASSWORD ){
        const token = jwt.sign({
            userId: 1, 
        }, process.env.SECRET);
        res.json({
            token
        });
        //console.log("logged in");
    } else {
        res.status(401).send("Wrong password");
    }
};

export const User = { 
    login
};
