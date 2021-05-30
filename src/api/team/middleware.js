const checkCollectionMutation = (req, res, next) => {
    const { body } = req;
    if (body.members || body.name || body.description)
        return next();

    return res.status(400).send('Data missing');
}

export {
    checkCollectionMutation
}