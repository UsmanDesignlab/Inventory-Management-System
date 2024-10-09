import { Request, Response, NextFunction } from "express"
import { Users } from "../../register/model/user";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const userRegister = (req: Request, res: Response) => {
  try {
    const { username, email, password, role, storeId } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let register = await Users.create({ username, email, password: hash, role, storeId })
        let token = jwt.sign({ email }, "secret", { expiresIn: "4h" })
        res.cookie("token", token)
        res.status(200).json({
          token
        });
      });
    })
  } catch (err) {
    console.log(err)
    res.status(200).json("Error Occurred");
  }
}

export const loginRegister = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const one = await Users.findOne({ where: { email: email } });
    if (!one) {
      return res.send(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, one.password, function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (result) {
        // If password matches, generate a token
        const token = jwt.sign({ userId: one.id, role: one.role }, "secret", { expiresIn: "4h" });
        console.log(one.id)
        console.log(one.role)
        res.cookie("token", token);
        return res.status(200).json({ message: "Login successful", token });
      }
      return res.status(200).send("invalid Entry");
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error occurred" });
  }
};



export const userLogout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "");
    res.status(200).json("Register Logout");
  }
  catch (err) {
    console.log(err);
    res.send("An Error Occurred")
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await Users.findAll({ where: { email: email } })
    if (!user.length) {
      return res.send("Something went wrong");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let one = await Users.update({ password: hash }, { where: { email: email } })
          if (!one) {
            return res.send("Something went wrong");
          } else {
            let token = jwt.sign({ email }, "secret", { expiresIn: "4h" })
            res.cookie("token", token)
            res.status(200).json({
              message: "Change password Successfully", token
            });
          }
        });
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(200).json("Error Occurred");
  }
}

export const user = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await Users.findAll({ where: { email: email } })
    if (!user) {
      return res.status(403).json("Something went wrong");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          let one = await Users.update({ password: hash }, { where: { email: email } })
          if (!one) {
            return res.send("Something went wrong");
          } else {
            let token = jwt.sign({ email }, "secret", { expiresIn: "4h" })
            res.cookie("token", token)
            res.status(200).json({
              message: "Change password Successfully", token
            });
          }
        });
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(200).json("Error Occurred");
  }
}


export const userProfile = async (req: Request, res: Response) => {
  try {
    const data: any = jwt.verify(req.cookies.token, "secret");
    const userId = data.userId;
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({
      message: "User profile fetched successfully",
      user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error occurred while fetching user profile" });
  }
};
