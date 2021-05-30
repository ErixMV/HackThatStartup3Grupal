import User from './model';

const find = async (filter = {}, projection = {}) =>
    await User.find(filter, projection);

const addOne = async (newUser) =>
    await new User(newUser).save();

const updateOne = async (id, newUser) =>
    await User.findByIdAndUpdate(id, newUser, { new: true, useFindAndModify: false });

const deleteOne = async (id) =>
    await User.findByIdAndDelete(id);

export default {
    find,
    addOne,
    updateOne,
    deleteOne
}