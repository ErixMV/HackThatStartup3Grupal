const checkCollectionMutation = (req, res, next) => {
    const { body } = req;
    if (body.password || body.email || body.username)
        return next();

    return res.status(400).send('Data missing');
}

export {
    checkCollectionMutation
}