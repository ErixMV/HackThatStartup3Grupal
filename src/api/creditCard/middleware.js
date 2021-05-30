const checkCollectionMutation = (req, res, next) => {
    const { body } = req;
    if (body.name || body.userId || body.number || body.expDate || body.credits)
        return next();

    return res.status(400).send('Data missing');
}

export {
    checkCollectionMutation
}