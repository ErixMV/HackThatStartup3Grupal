import to from 'await-to-js';
import rp from './repository';

const send = (res, code, data) =>
    res.status(code).send(data);

const getAll = async (req, res) =>
    send(res, 200, await rp.find());

const getOne = async (req, res) => {
    const { id } = req.params,
        [err, creditCardFound] = await to(rp.find({ _id: id }));

    if (err)
        return send(res, 404, err.message);

    return send(res, 200, creditCardFound);
}

const getUserCreditCard = async (req, res) => {
    const { id } = req.params;
    const [err, arrCreditCard] = await to(rp.find({ userId: id }));
    if (err || !arrCreditCard)
        return send(res, 404, err ? err.message : 'Credit card not found.');

    return send(res, 200, arrCreditCard[0]);
}

const add = async (req, res) => {
    const { body } = req,
        [err, newCreditCard] = await to(rp.addOne(body));

    if (err)
        return send(res, 400, err.message);

    return send(res, 201, newCreditCard);
}

const updateOne = async (req, res) => {
    const { id } = req.params, { body } = req;
    const [err, creditCard] = await to(rp.updateOne(id, body));
    if (err)
        return send(res, 404, err.message);

    return send(res, 200, creditCard);
}

const deleteOne = async (req, res) => {
    const { id } = req.params,
        [err, deletedDoc] = await to(rp.deleteOne(id));

    if (err || !deletedDoc)
        return send(res, 404, err ? err.message : 'Credit card not found');

    return send(res, 200, deletedDoc);
}

export default {
    getAll,
    getOne,
    getUserCreditCard,
    add,
    updateOne,
    deleteOne
}