import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: any;
}

export function isLoggedIn(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.cookies.token) {
    return res.status(401).send("You are not logged in");
  }
  try {
    const data = jwt.verify(req.cookies.token, "secret");
    req.user=data
    // console.log('User logged in:', req.user);
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

export function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Admin') {
    console.log('req.user:', req.user);
    return res.status(403).send("Forbidden");
  }
  next();
}

export function isStoreManager(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'storeManager'){
      console.log('Forbidden access. req.user:', req.user);
    return res.status(403).send("Forbidden");
  }
  next();
}

export function isEmployee(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Employee') {
      console.log('Forbidden access. req.user:', req.user);
      return res.status(403).send("Forbidden");
  }
  next();
}


export function hasAccess(req: CustomRequest, res: Response, next: NextFunction) {
  const allowedRoles = ['Admin', 'storeManager', 'Employee'];
  
  if (!req.user || !allowedRoles.includes(req.user.role)) {
      console.log('Forbidden access. req.user:', req.user);
      return res.status(403).send("Forbidden");
  }
  
  next();
}

export function isAdminOrStoreManager(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user || (req.user.role !== 'Admin' && req.user.role !== 'storeManager')) {
      console.log('Forbidden access. req.user:', req.user);
      return res.status(403).send("Forbidden");
  }
  next();
}
