import jwt from "jsonwebtoken";
const secret_token = process.env.ACCESS_TOKEN_SECRET

class tokenService{
    generateToken(unique_thing)
    {
        return jwt.sign(unique_thing,secret_token)
    }
    verifyToken(token)
    {
        return jwt.verify(token,secret_token);
    }
}

export default new tokenService();