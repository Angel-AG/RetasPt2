import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import CustomError from './customError';
import User from '../models/User';
import { NextFunction, Request, Response } from 'express';

interface VerifiedUserPayload extends JwtPayload {
    id: number
}

export interface RequestWithAuth extends Request {
    user?: User
}
// TODO: 
// check if ALL of this is still valid after changes
export async function isLoggedIn(req: RequestWithAuth, res: Response, next: NextFunction) {
    // const token = req.headers['authorization'];
    const token = req.cookies.authcookie;
    if (!token) {
        res.redirect("/login");
        return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    // TODO: redirect to error page
    if (!jwtSecret) return Promise.reject(new CustomError(500, "No JWT Secret has been set."));
    try {
        const data : VerifiedUserPayload = jwt.verify(token, jwtSecret) as VerifiedUserPayload;
        const user = await User.findByPk(data.id);
        if (user && user.token != token) {
            // TODO: redirect to login with message
            res.redirect("/login");
            return;
        }
    
        if (user) {
            req.user = user;
            next()
        } else {
            res.redirect("/login");
            return;
        }
    } catch (error) {
        res.redirect("/login");
    }
}


// this works right now as long as there is no token
export async function getUser(req: RequestWithAuth, res: Response, next: NextFunction) {
    const token = req.cookies.authcookie;
    if (!token) {
        next();
        return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return Promise.reject(new CustomError(500, "No JWT Secret has been set."));
    try {
        const data : VerifiedUserPayload = jwt.verify(token, jwtSecret) as VerifiedUserPayload;
        const user = await User.findByPk(data.id);
        if (user && user.token == token) {
            req.user = user;
        }
        next();
    } catch (error : unknown) {
        next();
    }
}