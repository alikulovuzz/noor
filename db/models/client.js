const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: [false, 'Please, write your name at least'],
    trim: true,
    min: 4,
    max: 25
  },
  url: {
    type: String,
    required: [false, 'Please, write your name at least'],
    trim: true,
    min: 4,
    max: 25
  }
});

const clientSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please, write your name at least'],
    trim: true,
    min: 4,
    max: 25
  },
  last_name: {
    type: String,
    default: null,
    trim: true,
    min: 4,
    max: 25
  },
  father_name: {
    type: String,
    default: null,
    trim: true,
    min: 4,
    max: 25
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    // required: 'Email address is required',
    // validate: [validateEmail, 'Please fill a valid email address'],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  img: [imgSchema],
  phone: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    // Validation succeeds! Phone number is defined
    // and fits `DDD-DDD-DDDD`
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    // required: [true, 'Admin phone number required'],
    min: 7,
    max: 20
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'client'],
      message: '{VALUE} is not supported'
    }
  },
  token: {
    type: String,
    min: 4
  },
},{ timestamps: true });

module.exports = mongoose.model("client", clientSchema);