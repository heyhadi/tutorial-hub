const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

function authenticate(req, res, next) {
    if (req.session.username) {
        next()
    } else {
        res.send('Login first!')
    }
}
router.get('/register', Controller.register)
router.post('/register', Controller.saveRegister)

router.get('/login', Controller.loginGet)
router.post('/login', Controller.loginPost)

router.get('/', Controller.home)

router.use(authenticate)

// router.get('/movies', Controller.moviesList)
router.get('/tutorials/add', Controller.addNewTutorial)
router.post('/tutorials/add', Controller.saveNewTutorial)
router.get('/tutorials/edit/:id', Controller.editForm)
router.post('/tutorials/edit/:id', Controller.updateEdit)
router.get('/tutorials/delete/:id', Controller.destroy)

router.get('/users', Controller.userList)
router.get('/users/add', Controller.addNewUser)
router.post('/users/add', Controller.saveNewUser)
// router.get('/users/edit/:id', Controller.editFormCast)
// router.post('/users/edit/:id', Controller.updateEditCast)
router.get('/users/delete/:id', Controller.destroyUser)

router.get('/tutorials/favorite/:id', Controller.showFavorite)

router.get('/like/:id', Controller.like)

// router.get('/addcasts/:id', Controller.addcast)
// router.post('/addcasts/:id', Controller.addcastUpdate)

// router.get('/casts/:id', Controller.showCast)


module.exports = router