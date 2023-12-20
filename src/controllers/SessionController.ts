import { Request, Response } from 'express';
import User from '../models/User';

export default class SessionController{
    async store(req: Request, res: Response) {
        const { email } = req.body;

        //Validando se ja tem esse usuario no banco 
        let user = await User.findOne({ email });

        //Se nao tiver ai vamos criar
        if (!user) {
            user = await User.create({ email });
        }

        return res.status(201).json(user);
    }
}