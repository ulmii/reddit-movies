import {Router, Request, Response} from 'express';
const route = Router();

export default (app: Router) => {
  route.get('/me', (req: Request, res: Response) => {
    return res.json().status(200);
  });
};
