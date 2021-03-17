const express        = require('express');
const mongoose       = require('mongoose');
const authRoutes     = require("./routes/authRoutes"); //diğer ejslerdeki modüller uzayda gezmesin diye kaptık çağrdığın modülleri aktif edebilmek için bu sayfadaki router başlığıın altında use methodu ile aktif et
const app            = express();
const cookieParser   = require("cookie-parser");
const { requireAuth } = require('./middleware/authMiddleware');
const { checkUser } = require('./middleware/authMiddleware');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());// burada neden app use diyoruz diyorsak diğerlerine neden demedik?

// view engine
app.set('view engine', 'ejs');

// database connection



mongoose.connect("mongodb://localhost/BlogApp", { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));




// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies
