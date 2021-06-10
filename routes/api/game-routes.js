const router = require('express').Router();
const { User, Game, Review } = require('../../models');


// POST game - for adding new game and then adding a review

router.post('/new', async (req, res) => {

    try {
        const addGame = await Game.create({
            game_name: req.body.game_name,
            game_desc: req.body.game_desc,
            picture: 'game-placeholder-image.jpg'
        })

        const newGame = addGame.get({ plain: true })
        console.log(newGame)
        const addReview = await Review.create({
            game_id: newGame.id,
            review_txt: req.body.review_txt,
            review_score: req.body.review_score,
            user_name: req.session.user_name,
            user_id: req.session.user_id,


        })

        console.log(addReview)

        const newReview = addReview.get({ plain: true })

        // redirect them to the new game page
        res.redirect(`/gameProfile/${newReview.game_id}`)

    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});


module.exports = router;













