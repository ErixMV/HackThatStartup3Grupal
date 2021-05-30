import CreditCard from './model';

const find = async (filter = {}, projection = {}) =>
    await CreditCard.find(filter, projection);

const addOne = async (newUser) =>
    await new CreditCard(newUser).save();

const updateOne = async (id, newRepository) =>
    await CreditCard.findByIdAndUpdate(id, newRepository, { new: true, useFindAndModify: false });

const deleteOne = async (id) =>
    await CreditCard.findByIdAndDelete(id);

export default {
    find,
    addOne,
    updateOne,
    deleteOne
}