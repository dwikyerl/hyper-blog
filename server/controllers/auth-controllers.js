const { User } = require('./../models');
const axios = require('axios');

exports.login = async (req, res) => {
  const user = await User.isValidUser(req.body.username);
  if (!user) {
    return res.status(400).json({
      message: 'Invalid username or password',
    });
  }
  
  const match = await user.matchPassword(req.body.password);
  if (match) {
    const token = await user.generateToken();

    res.status(200).json({
      message: 'Logged In Successfully',
      token,
    });
  } else {
    res.status(400).json({
      message: 'Invalid username or password',
    });
  }
};

exports.oauth = async (req, res) => {
  try {
    const { data } = await axios.get('https://graph.facebook.com/me?fields=id,name,email,first_name, last_name', {
      headers: {
        'Authorization': `Bearer ${req.body.accessToken}`
      }
    });
    
    let user = await User.findOne({ email: data.email });

    if (!user) {
      const username = `${data['first_name']}-${data['last_name']}`.toLowerCase();
      const signUpData = {
        username,
        email: data.email
      };

      user = await User.create(signUpData);
    }

    const token = await user.generateToken();

    res.status(200).json({
      message: 'Logged In Successfully',
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Error Server',
    });
  }
}

exports.verifyAdmin = (req, res) => {
  if (req.user.role === 'admin') {
    return res.status(200).json({ message: 'Admin verified'})
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
}