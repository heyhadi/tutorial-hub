const { User, Tutorial, FavouriteTutorial } = require('../../models/index')
const tuannyonya = require('../helpers/tuannyonya')

class Controller {

    static like(req, res) {
        let paramId = +req.params.id
        // console.log(req.session.user);
        // console.log(paramId);
        
        let obj = {
            TutorialId: paramId,
            UserId: req.session.user
        }

        // FavouriteTutorial.update(obj, )
        // .then( data => {
        //     res.redirect(`/tutorials/favorite/${paramId}`)
        // })
        // .catch(err => {
        //     res.send(err)
        // })

        FavouriteTutorial.findOne({
            where: {
                TutorialId: paramId, UserId: req.session.user
            }
        })
        .then(results => {
            if (results) {
                res.redirect(`/tutorials/favorite/${paramId}`)
            } else {
                FavouriteTutorial.create(obj)
                .then(data => {
                    res.redirect(`/tutorials/favorite/${paramId}`)
                })
            }
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static register(req, res) {
        res.render('register')
    }


    static saveRegister(req, res) {
        let obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
        }

        User.create(obj)
            .then(result => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static loginGet(req, res) {
        res.render('login')
    }

    static loginPost(req, res) {
       User.findOne({where: { username: req.body.username, password: req.body.password }})
        .then(data => {
            req.session.username = data.username
            req.session.user = data.id
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }

    // TUTORIAL

    static home(req, res) {
        Tutorial.findAll()
        .then(data => {
            res.render('home', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }
    

    // static moviesList(req, res) {
    //     Tutorial.findAll( {include: Tutorial,
    //         order: [
    //             ['released_year', 'DESC']
    //         ]
    //     })
    //     .then(data => {
    //         console.log(data);
    //         res.render('movies', { data })
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
    // }

    static addNewTutorial(req, res) {
        let error = null;

        if(req.query.error) {
            error = req.query.error
        }
        res.render('addTutorialForm', {error})
    }

    static saveNewTutorial(req, res) {
        let obj = {
            title: req.body.title,
            uploader_name: req.body.uploader_name,
        }

        Tutorial.create(obj)
            .then(result => {
                res.redirect('/')
            })
            .catch(err => {
                res.redirect(`/tutorials/add?error=${err.message}`)
            })
    }

    static editForm(req, res) {
       let paramId = req.params.id
        let prodHouse = []
        Tutorial.findByPk(paramId)
        .then(data => res.render('tutorialEdit', {data}))
        .catch(err => res.send(err))
    }

    static updateEdit(req, res) {
        
        let obj = {
            title: req.body.title,
            uploader_name: req.body.uploader_name,
        }
        
        let id = +req.params.id

        Tutorial.update(obj, {where: {id}})
          .then(data => {
            res.redirect('/')
          })
          .catch(err => {
            res.send(err)
          })
    }

    static destroy(req, res) {
        let id = +req.params.id

        Tutorial.destroy({where: {id}})
          .then(data => {
            res.redirect('/')
          })
          .catch(err => {
            res.send(err)
          })
    }




    // USER

    static userList(req, res) {
        User.findAll()
        .then(data => {
            res.render('user', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addNewUser(req, res) {
        res.render('addUserForm')
    }

    static saveNewUser(req, res) {
        let obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
        }

        User.create(obj)
            .then(result => {
                res.redirect('/users')
            })
            .catch(err => {
                res.send(err)
            })
    }

    // static editFormCast(req, res) {
    //     let paramId = req.params.id
    //     Cast.findByPk(paramId)
    //     .then(value => res.render('castEdit', {value}))
    //     .catch(err => res.send(err))
    //  }

    //  static updateEditCast(req, res) {
        
    //     let obj = {
    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //         birth_year: req.body.birth_year,
    //         phone_number: req.body.phone_number,
    //         gender: req.body.gender,
    //     }
    //     console.log(obj);
    //     let id = +req.params.id

    //     Cast.update(obj, {where: {id}})
    //       .then(data => {
    //         res.redirect('/casts')
    //       })
    //       .catch(err => {
    //         res.send(err)
    //       })
    // }

    static destroyUser(req, res) {
        let id = +req.params.id

        User.destroy({where: {id}})
          .then(data => {
            res.redirect('/users')
          })
          .catch(err => {
            res.send(err)
          })
    }


    // FAVORITE

    static showFavorite(req, res) {
        let id = +req.params.id
       
        Tutorial.findByPk(id, {include: [User]})
        .then( value => {
            console.log(value);
            res.render('favorite', { value, tuannyonya })
        })
        .catch(err => {
            res.send(err)
        })
    }


    static addcast(req, res) {
        let id = +req.params.id
        let cast = []
        let moviecast = []
        Cast.findAll()
        .then(value => {
            cast = value
            return MovieCast.findAll({where: {MovieId : id}
            })
        })
        .then(result => {
            moviecast = result
            return Tutorial.findByPk(id, {include: Cast})
        })
        .then(data => {
            // console.log(moviecast);
            res.render('addcasts', {data, cast, moviecast})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addcastUpdate(req,res){
        const id = req.params.id
        const CastId =  req.body.cast 
        const role = req.body.role

        const newData = {
            role: req.body.role,
            MovieId: id,
            CastId: req.body.CastId
        }
        MovieCast
            .create(newData)
            .then( result =>{
                res.redirect(`/addcasts/${id}`)
            })
            .catch( err =>{
                res.send(err)
            })

    }




    static showCast(req, res) {
        const id = req.params.id

        let cast = []
        Cast.findByPk(id, {include: Tutorial})
        .then((data) => {
            console.log(data.Movies);
            cast = data
            return MovieCast.findAll({where: {CastId : id}})
        })
        .then((result) => {
            res.render('showCast', {cast, result, age})
        })
    }

}

module.exports = Controller