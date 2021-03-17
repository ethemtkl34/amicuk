const mongoose      = require("mongoose");
const { isEmail }   = require("validator");
const bcrypt        = require("bcrypt");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"please enter  email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "please enter valid email"]
        
    },

    password:{
        type: String,
        required: [true,"please enter  password"],
        minlength:[6, "minimum password lenght is 6 caracters"]
    },

    googleID:{
        type: String

    },

    appleId:{
        type: String
    }

});

//db ye  doc kayıt olunduktan asonra fonksiyonu ateşle 
//userSchema.post("save", function(doc, next){
  //  console.log("new user was created & saved", doc);
  //  next();
//} )



//db ye doc kayıt olmadan fonksşiyonu ateşle
userSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt();
this.password= await bcrypt.hash(this.password,salt);
next();
});

// kullanıcı girişi için statik metot
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    /// bune ???
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
            
        } 
        
        throw Error("incorrect password");
    }
    throw Error ("incorrect email");
}


const User = mongoose.model("user", userSchema);

module.exports = User;