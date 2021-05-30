import Repository from './model';

const find = async (filter = {}, projection = {}) =>
    await Repository.find(filter, projection);

const addOne = async (newUser) =>
    await new Repository(newUser).save();

const updateOne = async (id, newRepository) =>
    await Repository.findByIdAndUpdate(id, newRepository, { new: true, useFindAndModify: false });

const deleteOne = async (id) =>
    await Repository.findByIdAndDelete(id);

export default {
    find,
    addOne,
    updateOne,
    deleteOne
}