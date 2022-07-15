import {Request, Response} from 'express';
import {ApiService} from '../service/api-service';


export class ProxyController {
    private readonly apiService : ApiService;

    constructor() {
      this.apiService = new ApiService();
    }

    async getPostsService(req: Request, res: Response) {
      try {
        const params = String(req.query.params);
        const response = await this.apiService.getPostsService(params);
        console.log(`Response: ${JSON.stringify(response)}`);
        res.status(200).send(response);
      } catch (error) {
        res.status(500).send(error);
      }
    }

    async getPhotosService(req: Request, res: Response) {
      try {
        const params = String(req.query.params);
        const response = await this.apiService.getPhotosService(params);
        console.log(`Response: ${JSON.stringify(response)}`);
        res.status(200).send(response);
      } catch (error) {
        res.status(500).send(error);
      }
    }
}
