import { Request, Response } from "express";
import { fn, Op } from "sequelize";

import db from "../db/models";
import { createToken } from "../utils/jwt";

type BodyFetch = {
  username: string;
  email: string;
  password: string;
  lang: string;
};

const verify = (_req: Request, res: Response): any => {
  global.logger.info("in function verify");
  try {
    return res.status(200).json({ message: "ok" });
  } catch (_error: any) {
    const error: Error = _error ?? new Error("Error no defined");
    return res.status(500).json({ message: error.message });
  }
};

const signIn = async (req: Request, res: Response): Promise<any> => {
  global.logger.info("on route sign in");
  const { username, email, password } = req.body as BodyFetch;
  const { lang = "en" } = req.query;
  const t = await db.sequelize.transaction();

  const regExpEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const regExpUser = new RegExp(/^[a-z0-9_.]{6,32}$/);
  const regExpPass = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;\-_$@$!%*?&])([.,:;\-_$@$!%*?&a-zA-Z\d]){8,24}$/
  );

  try {
    if (!regExpEmail.test(email)) throw new Error("email");
    if (!regExpUser.test(username)) throw new Error("username");
    if (!regExpPass.test(password)) throw new Error("password");

    const userExists = await db.User.findOne({
      where: { [Op.or]: { email, username } },
    });

    if (userExists) {
      if (userExists.email == email) throw new Error("emailInUse");
      if (userExists.username == username) throw new Error("usernameInUse");
    }

    const newUser = await db.User.create(
      {
        id: undefined,
        email,
        username,
        password: fn("SHA1", password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { transaction: t }
    );

    const token = createToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });
    global.logger.debug(token);

    await t.commit();
    return res.status(200).json({ token });
  } catch (_error: any) {
    const error: Error = _error ?? new Error("Error no defined");
    if (error) {
      let message: string;
      switch (error.message) {
        case "email":
          message =
            lang == "es"
              ? "El correo no es valido"
              : "The email address is no valid";
          break;
        case "username":
          message =
            lang == "es"
              ? "El nombre de usuario no es valido"
              : "The username is no valid";
          break;
        case "password":
          message =
            lang == "es"
              ? "La contraseña no es valida"
              : "The password is no valid";
          break;
        case "emailInUse":
          message = lang == "es" ? "Correo en uso" : "Email in use";
          break;
        case "usernameInUse":
          message =
            lang == "es" ? "Nombre de usuario en uso" : "Username in use";
          break;
        default:
          message = error.message;
          break;
      }

      await t.rollback();
      return res.status(400).json({ message });
    }
  }
};

const logIn = async (req: Request, res: Response): Promise<any> => {
  global.logger.info("on route log in");
  const { username, password } = req.body as BodyFetch;
  const { lang = "en" } = req.query;

  try {
    const user = await db.User.findOne({
      attributes: ["id", "username", "email"],
      where: {
        [Op.or]: { username, email: username },
        password: fn("SHA1", password),
      },
    });
    console.log(user);

    if (!user) throw new Error("user");

    const token = createToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    global.logger.debug(token);

    const message =
      lang == "es" ? "Inicio de sesión exitosa" : "Log In successfully";

    res.setHeader("Authorization", token);

    return res.status(200).json({ message });
  } catch (_error: any) {
    const error = (_error as Error) ?? new Error("Error no defined");
    let message: string;
    if (error.message == "user")
      message =
        lang == "es"
          ? "Usuario/Coreo o Contraseña no valida"
          : "Username/Email or Password incorrect";
    else message = error.message;
    console.log(message);

    return res.status(400).json({ message });
  }
};

export { verify, signIn, logIn };
