import axios, {AxiosInstance} from 'axios';


export class ApiService {
    public readonly instance : AxiosInstance;
    headerAuth: any;

    constructor() {
      this.instance = axios.create({
        baseURL: process.env.proxy_urls
      });
    }

    public async getPostsService(params : string) {
      const url = `/posts`;

      try {
        const response = await this.instance.get(url, {params});
        return response.data;
      } catch (err : any) {
        const error = {
          code: 'Error',
          message: `${err}`
        };
        if (err.response.status == 500) {
          error.code = 'NODE-500',
          error.message = `Internal Server Error - ${err.message}`;
          throw error;
        } else {
          error.code = 'NODE-404',
          error.message = `Error 404 -  Data Not Found`;
          console.log(error);
          return error;
        }
      }
    }

    public async getPhotosService(params : string) {
      const url = `/photos`;

      try {
        const response = await this.instance.get(url, {params});
        return response.data;
      } catch (err : any) {
        const error = {
          code: 'Error',
          message: `${err}`
        };
        if (err.response.status == 500) {
          error.code = 'NODE-500',
          error.message = `Internal Server Error - ${err.message}`;
          throw error;
        } else {
          error.code = 'NODE-404',
          error.message = `Error 404 -  Data Not Found`;
          console.log(error);
          return error;
        }
      }
    }
}
