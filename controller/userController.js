const db = require('../model')
const userModel = db.userModel


const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, contact, address1, address2, role, flag } = req.body
    if (!firstName) { res.json({ status: false, message: 'Firstname required' }) }
    else if (!lastName) { res.json({ status: false, message: 'Lastname required' }) }
    else if (!email) { res.json({ status: false, message: 'Email required' }) }
    else if (!contact) { res.json({ status: false, message: 'Phone required' }) }
    else if (!address1) { res.json({ status: false, message: 'Address1 required' }) }
    else if (!address2) { res.json({ status: false, message: 'Address2 required' }) }
    else if (!role) { res.json({ status: false, message: 'role required' }) }
    // else if(!flag){res.json({status:false,message:'Item Deleted'})}
    else {
      const isEmail = await userModel.count({ email })
      if (isEmail) {
        res.json({ status: false, message: 'Email already exists' })
      } else {
        if (req.path) {
          await userModel.create({
            firstName,
            lastName,
            email,
            contact,
            address1,
            address2,
            role,
            flag,
            // profile_img:req.path
          })
          res.json({ status: true, message: 'Data recorded successfully...' })
        } else {
          await userModel.create({
            firstName,
            lastName,
            email,
            contact,
            address1,
            address2,
            role,
            flag,
          })
          res.json({ status: true, message: 'Data recorded successfully...' })
        }
      }
    }
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

const userDetailsGet = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  // console.log(_id);
  try {
    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.flag = false;
    await user.save();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { _id } = req.params;
  const { firstName, lastName, email, contact, address1, address2, role } = req.body;
  try {
    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.contact = contact;
    user.address1 = address1;
    user.address2 = address2;
    user.role = role;
    user.flag = true;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  userRegister,
  userDetailsGet,
  deleteUser,
  updateUser
}