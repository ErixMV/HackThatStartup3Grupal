import to from 'await-to-js';
import rp from './repository';

const send = (res, code, data) =>
    res.status(code).send(data);

const getAll = async (req, res) =>
    send(res, 200, await rp.find());

const getOne = async (req, res) => {
    const { id } = req.params,
        [err, userFound] = await to(rp.find({ _id: id }));

    if (err)
        return send(res, 404, err.message);

    return send(res, 200, userFound);
}

const add = async (req, res) => {
    const { body } = req,
        [err, newUser] = await to(rp.addOne(body));

    if (err)
        return send(res, 400, err.message);

    return send(res, 201, newUser);
}

const updateOne = async (req, res) => {
    const { id } = req.params, { body } = req;
    return send(res, 200, await rp.updateOne(id, body));
}

const deleteOne = async (req, res) => {
    const { id } = req.params,
        [err, deletedDoc] = await to(rp.deleteOne(id));
    if (err || !deletedDoc)
        return send(res, 404, err ? err.message : 'User not found');

    return send(res, 200, deletedDoc);
}

export default {
    getAll,
    getOne,
    add,
    updateOne,
    deleteOne
}