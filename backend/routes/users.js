const router = require('express').Router();
let User = require('../models/users.model');

router.route('/:page/:size').get((req, res) => {
    let searchQ = req.query.search ? { "username": { "$regex": req.query.search, "$options": "i" } } : {}
    let perPage = req.params.size
        , page = Math.max(0, Number(req.params.page))
    User.find(searchQ)
        .limit(Number(perPage))
        .skip(perPage * page)
        .sort({
            gender: req.query.gender,
            dob: req.query.dob,
        })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/size').get((req, res) => {
    User.count({}).then(count => res.json(count))
        .catch(err => res.status(401).json('Error: ' + err))
})
router.route('/:id').get((req, res) => {
    User.findById({ "_id": req.params.id })
        .then(user => res.json(user))
        .catch(err => res.status(401).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    const username = req.body.username
    const gender = req.body.gender
    const dob = req.body.dob
    const news = req.body.news
    const email = req.body.email
    const photo = req.body.photo

    const newUser = new User({
        username,
        gender,
        dob,
        news,
        email,
        photo,
    });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/:id').put((req, res) => {
    let count = 0;
    User.findById(req.params.id)
        .then(
            user => {
                if (req.body.username != null) {
                    count++; user.username = req.body.username
                }
                if (req.body.gender != null) {
                    count++; user.gender = req.body.gender
                }
                if (req.body.dob != null) {
                    count++; user.dob = req.body.dob
                }
                if (req.body.news != null) {
                    count++; user.news = req.body.news
                }
                if (req.body.email != null) {
                    count++; user.email = req.body.email
                }
                if (req.body.photo != null) {
                    count++; user.photo = req.body.photo
                }
                user.save()
                    .then(() => res.json('User updated! using ' + count + ' fields'))
                    .catch(err => res.status(400).json('Error: ' + err))
            }
        )
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;