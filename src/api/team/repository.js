import Team from './model';

const find = async (filter = {}, projection = {}) =>
    await Team.find(filter, projection);

const addOne = async (newUser) =>
    await new Team(newUser).save();

const updateOne = async (id, newTeam) =>
    await Team.findByIdAndUpdate(id, newTeam, { new: true, useFindAndModify: false });

const deleteOne = async (id) =>
    await Team.findByIdAndDelete(id);

export default {
    find,
    addOne,
    updateOne,
    deleteOne
}