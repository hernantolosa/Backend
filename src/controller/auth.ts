import {Request, Response} from 'express';

import User, {IUser} from '../models/user';
import {signupValidation, signinValidation} from '../libs/joi';
import jwt from 'jsonwebtoken';

export class AuthController{
  
  constructor(){

  }

  async signUp  (req: Request, res: Response){
    const {error} = signupValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // Valido el email
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).json('El email ya se encuentra registrado');
    try {
      const newUser: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      newUser.password = await newUser.encrypPassword(newUser.password);
      const savedUser = await newUser.save();

      const token: string = jwt.sign({_id: savedUser._id}, process.env['TOKEN_SECRET'] || '', {
        expiresIn: 60 * 60 * 24
      });
      // res.header('auth-token', token).json(token);
      res.header('auth-token', token).json(savedUser);
    } catch (error) {
        res.status(400).json(error);
    }
  }
  
  async signIn (req: Request, res: Response) {
    const {error} = signinValidation(req.body);
    if (error) return res.status(400).json(error.message);
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json('Los campos Email o Contraseña son invalidos');
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Contraseña invalida');

    // Creacion de token
    const token: string = jwt.sign({_id: user._id}, process.env['TOKEN_SECRET'] || '');
    res.header('auth-token', token).json(token);
  }

  async profile (req: Request, res: Response) {
    const user = await User.findById(req.userId, {password: 0});
    if (!user) {
      return res.status(404).json('Usuario no encontrado');
    }
    res.json(user);
  }
}
