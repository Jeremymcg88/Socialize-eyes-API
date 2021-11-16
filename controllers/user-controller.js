const { User, Thought } = require('../models');

const userController = {
    // Get all users
    getAllUser(req, res) {
        User.find({})
        // Includes the thoughts related to each user
        .populate({
            path: 'thoughts',
            // Omits the version key from results for thoughts
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        // Omits the version key from results for user
        .select('-__v')
        // -1 denotes descending order
        // .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
}