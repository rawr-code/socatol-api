const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMINISTRADOR', 'CONSULTOR', 'CONTABLE']
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  else {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error('esto es un error de bcrypt: genSalt', err);
      else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) console.error('error al generar hash', err);
          else {
            user.password = hash;
            next();
          }
        });
      }
    });
  }
});

module.exports = model('User', userSchema);
