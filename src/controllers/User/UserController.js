const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config");

const { User } = require("../../models/User");

async function Register(req, res) {
  try {
    const user = await User.findOne({ username: req.body.email });
    if (user) {
      return res.status(400).json({
        email: "Este correo ya esta registrado"
      });
    } else {
      const newUser = new User({
        username: req.body.email,
        password: req.body.password
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.error(`Ocurrio un error en REGISTER CONTROLLER: ${err}`);
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ username: email });
    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado!" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload = {
          id: user.id,
          email: user.username
        };
        jwt.sign(
          payload,
          config.JWT_SECRET,
          {
            expiresIn: "1h"
          },
          (err, token) => {
            if (err) console.error(`Error al generar TOKEN: ${err}`);
            else {
              return res.status(200).json({
                token
              });
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Usuario o contraseña incorrecto." });
      }
    }
  } catch (err) {
    console.error(`Ocurrio un error en LOGIN CONTROLLER: ${err}`);
  }
}

module.exports = { Register, Login };
