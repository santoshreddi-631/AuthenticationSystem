import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pool from "./db.js"
const app = express();

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");
    connection.release();
} catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
}


app.get('/', (req, res) => {
    res.status(200).json("HI i am the default route...");
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email received:", email);

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log("Users found:", users);

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const passwordHash = users[0].password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    return res.status(200).json({
      message: "Login Success"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(`insert into users(name,email,password) values('${name}','${email}','${hashedPassword}')`)
    console.log(newUser);
    res.status(200).json({ message: "New User Registered succesfully!" })

})

app.listen(process.env.PORT, () => {
    console.log(`Server is Started on ${process.env.PORT}...`);
})
