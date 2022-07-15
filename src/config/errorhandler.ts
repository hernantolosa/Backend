import {Request, Response, NextFunction} from 'express';

function errorHandler(
  err: TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.url.includes('/')) {
    res.status(400).send({code: 'NODE-400', message: `Invalid URL: ${req.url}`});
  } else {
    res.status(500).send({code: 'NODE-500', message: `Server Unavailable`});
  }
}

export default errorHandler;
