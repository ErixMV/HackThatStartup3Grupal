import User from './model';

const find = async (filter = {}, projection = {}) =>
  await User.find(filter, projection);

const addOne = async (newUser) => await new User(newUser).save();

const updateOne = async (id, newUser) =>
  await User.findByIdAndUpdate(id, newUser, {
    new: true,
    useFindAndModify: false,
  });

const deleteOne = async (id) => await User.findByIdAndDelete(id);

const findByUsername = async (username) => {
  return await User.findOne({ username }).exec();
};

const findById = async (id) => await User.findById(id).exec();

export default {
  find,
  addOne,
  updateOne,
  deleteOne,
  findByUsername,
  findById,
};
