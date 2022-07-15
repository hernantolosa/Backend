/* eslint-disable new-cap */

import express = require('express');
import {ProxyController} from '../controller/proxy-controller';
import {AuthController} from '../controller/auth';
import {TokenValidation} from '../libs/verify-token';

export class ProxyRoutes {
  private readonly proxyController: ProxyController;
  private readonly authController: AuthController;

  constructor() {
    this.proxyController = new ProxyController();
    this.authController = new AuthController();
  }

  get routes() {
    const router = express.Router();

    router.post('/signup', (req, res) => this.authController.signUp(req, res));
    router.post('/signin', (req, res) => this.authController.signIn(req, res));
    router.get('/profile', TokenValidation, (req, res) => this.authController.profile(req, res));
    router.get('/posts', TokenValidation, (req, res) => this.proxyController.getPostsService(req, res));
    router.get('/photos', TokenValidation, (req, res) => this.proxyController.getPhotosService(req, res));

    return router;
  }
}

export default new ProxyRoutes();
