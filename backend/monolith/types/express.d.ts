// ******* I created this for typescript using payload from request - global express *******
import { JwtPayload } from "jsonwebtoken";
import { Multer } from "multer"; 

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
      file?: Multer.File;
    }
  }
}