import  Jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        //console.log(authHeader);
        res.status(401).send('invalid cradentials, missing');
    } else {
        const token = authHeader.split(' ')[1];
        Jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                res.status(403).send('invalid cradentials, wrong');
            } else {
                //req.userId = decodedToken.userId;
                next();
            }
        //console.log(token);
        })
    }
}

export default isLoggedIn;