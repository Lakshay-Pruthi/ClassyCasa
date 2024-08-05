import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailServer.js";
import path from "path";
import rootDir from "../utils/path.js";
import { validationResult } from "express-validator";

export const authenticateController = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const id = decoded._id;
      const user = await User.findOne({ _id: id });
      res.send(user);
    } else {
      res.send(404).json({ message: "No token found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUpController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(422).json({ error: "This email already exists!" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  });

  await user.save();
  console.log("User data saved to database successfully ✅");

  const info = {
    from: { name: "ClassyCasa", address: "classycasa.furniture@gmail.com" },
    to: email,
    subject: "Welcome to ClassyCasa!",
    html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to ClassyCasa</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    line-height: 1.6;
                }
                .container {
                    color : white;
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    background-color: #045b62;
                }
                 h1 {
                    color: #faebd7;
                }
                p {
                    margin: 10px 0;
                }
                .highlight {
                    color: #faebd7;
                }
                .cta {
                    text-decoration: none;
                    display: block;
                    width: 200px;
                    margin: 20px auto;
                    padding: 10px;
                    text-align: center;
                    background-color: #faebd7;
                    color : black;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to ClassyCasa!</h1>
                <p>Dear <strong>${name}</strong>,</p>
                <p>We are thrilled to have you join our community. At ClassyCasa, we believe that your home should reflect your unique style and personality, and we are here to make it happen with ease and flexibility.</p>
                <h2>Here’s what you can look forward to as a member of ClassyCasa:</h2>
                <ul>
                    <li><strong>Wide Range of Furniture:</strong> Explore our extensive collection of stylish and comfortable furniture, perfect for every room in your home.</li>
                    <li><strong>Flexible Renting Options:</strong> Enjoy the flexibility to rent furniture on your terms. Whether you need it for a few months or a year, we’ve got you covered.</li>
                    <li><strong>Quality Assurance:</strong> Rest assured that all our furniture pieces are of top-notch quality, meticulously maintained to ensure they meet the highest standards.</li>
                    <li><strong>Easy Process:</strong> Renting furniture has never been easier. Browse, select, and schedule delivery in just a few clicks.</li>
                    <li><strong>Excellent Customer Support:</strong> Our friendly and professional customer support team is here to assist you with any questions or concerns you may have.</li>
                </ul>
                <p>As a special welcome, we are offering you an exclusive discount on your first rental. Use the code <strong class="highlight">WELCOME10</strong> at checkout to get 10% off.</p>
                <p>Start exploring our collection now and transform your living space with ClassyCasa!</p>
                <a href="https://classycasa.onrender.com" class="cta">Explore Now</a>
                <p>Warm regards,</p>
                <p>The ClassyCasa Team</p>
            </div>
            <div class="footer">
                <p>ClassyCasa | Your Premier Furniture Renting Portal</p>
            </div>
        </body>
        </html>
      `,
    // we can add
    // CC :
    // attachments : file attachment
  };

  sendMail(info);

  const token = await user.generateAuthToken();
  console.log(token);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 300000000000),
    httpOnly: true,
  });

  res.send(user);
};

export const logInController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const dbPass = user?.password;
  const val = dbPass ? await bcrypt.compare(password, dbPass) : false;
  if (user && val) {
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000000),
    });
    res.send({ message: "Login Successfull" });
  } else {
    res.status(422).json({ error: "User does not exists" });
  }
};

export const updateUserDetailController = async (req, res) => {
  const { name, oldEmail, newEmail, phone, address } = req.body;
  const user = await User.findOne({ email: oldEmail });
  if (user) {
    const r = await User.updateOne(
      { email: oldEmail },
      {
        $set: {
          name: name,
          email: newEmail,
          phone: phone,
          address: address,
        },
      }
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000000),
    });
    res.send({ message: "Account updated successfully" });
  } else {
    res.status(422).json({ error: "User does not exists" });
  }
};

export const logoutUserController = async (req, res) => {
  res.clearCookie("jwt");
  res.end();
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user) {
    let OTP = Math.floor(Math.random() * 1000000);
    const info = {
      from: { name: "ClassyCasa", address: "classycasa.furniture@gmail.com" },
      to: email,
      subject: "Reset Password!",
      html: `<p> Your one time password is ${OTP}</p><br><p>Team - ClassyCasa</p>`,
    };
    try {
      sendMail(info).then((result) => {
        res.status(200).json({ message: "OTP sent successfully" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Some error occured!" });
    }
  } else {
    res.status(422).json({ error: "User does not exists" });
  }
};

// export const OTPVerificationController = async (req, res) => {
//   if (OTP == req.OTP) {
//     res.status(200).json({ message: "OTP Verified" });
//   } else {
//     res.redirect("/");
//   }
// };

export default logInController;
