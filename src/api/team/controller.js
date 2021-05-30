import to from 'await-to-js';
import rp from './repository';

const send = (res, code, data) =>
    res.status(code).send(data);

const getAll = async (req, res) =>
    send(res, 200, await rp.find());

const getOne = async (req, res) => {
    const { id } = req.params,
        [err, teamFound] = await to(rp.find({ _id: id }));

    if (err)
        return send(res, 404, err.message);

    return send(res, 200, teamFound);
}

const add = async (req, res) => {
    const { body } = req,
        [err, newTeam] = await to(rp.addOne(body));

    if (err)
        return send(res, 400, err.message);

    return send(res, 201, newTeam);
}

const updateOne = async (req, res) => {
    const { id } = req.params, { body } = req;
    const [err, team] = await to(rp.updateOne(id, body));
    if (err)
        return send(res, 404, err.message);

    return send(res, 200, team);
}

//TODO: Check if userid is real.
const addMember = async (req, res) => {
    const { id } = req.params, { userId } = req.body;
    const [err, arrTeam] = await to(rp.find({ _id: id }, { members: 1 }));
    if (err)
        return send(res, 404, err.message);

    if (!arrTeam || !userId)
        return send(res, 404, 'Team or user not found');

    const { members } = arrTeam[0];
    const isInTeam = members.find(user => user === userId);
    if (isInTeam)
        return send(res, 400, 'Already in the team');

    const team = arrTeam[0];
    team.members.push(userId);
    await team.save();

    return send(res, 200, team);
}

//TODO: Check if userid is real.
const deleteMember = async (req, res) => {
    const { id } = req.params, { userId } = req.body,
        arrTeam = await rp.find({ _id: id }, { members: 1 });

    if (!arrTeam)
        return send(res, 404, 'Team not found.');

    const { members } = arrTeam[0];
    const isInTeam = members.find(user => user === userId);
    if (!isInTeam)
        return send(res, 400, 'The user is not part of the team.');

    const newArrMembers = members.filter(user => user !== userId);
    const team = arrTeam[0];
    team.members = newArrMembers;
    await team.save();

    return send(res, 200, team);
}

const deleteOne = async (req, res) => {
    const { id } = req.params,
        [err, deletedDoc] = await to(rp.deleteOne(id));

    if (err || !deletedDoc)
        return send(res, 404, err ? err.message : 'Team not found');

    return send(res, 200, deletedDoc);
}

export default {
    getAll,
    getOne,
    add,
    addMember,
    updateOne,
    deleteOne,
    deleteMember
}