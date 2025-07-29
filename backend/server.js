require('dotenv').config()
const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db')
const app = express();

//connect DB
connectDB();
app.use(cors({
  // origin: "https://devconnector-p35p.onrender.com",
  origin: "*",
  credentials: true,
}));
//Init middleware
app.use(express.json({extended: false}))

app.get("/", (req, res)=>{
    res.send("API working...")
})

//define routes
app.use('/api/users', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/post'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))