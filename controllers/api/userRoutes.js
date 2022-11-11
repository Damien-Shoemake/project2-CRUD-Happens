const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', async (req, res) => {
    // Access our User model and run .findAll() method
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        })
        res.json(users)
        
    } catch {
        res.status(500).json({ message: 'Server Error'})
    }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
    try {
        const newUser = await User.findOne({
            attributes: { exclude: ['password']},
            where: {
              id: req.params.id
            },
            include: [
                {
                  model: Post,
                  attributes: ['id', 'title', 'post_content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'created_at'],
                    include: {
                      model: Post,
                      attributes: ['title']
                    }
                }
              ]
    
        })
        if (!newUser) {
            res.status(404).json({ message: 'No user with that ID found!'})
        } else {
            res.json(newUser)

        }

    } catch {
        
        res.status(500).json({ message: 'Server Error'});
    }
});

// post user to db
router.post('/', async (req, res) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    
    
    await req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.name = newUser.name;
        req.session.loggedIn = true;
    
        res.json(newUser);
      });
});

  // login route
  router.post('/login', async (req, res) => {
    try {
        const userLogin = User.findOne({
            where: {
              email: req.body.email
            }
          })
          if (!userLogin) {
              res.status(400).json({ message: 'Password or email incorrect!' });
              return;
          }
        
            const validPassword = userLogin.checkPassword(req.body.password);
        
            if (!validPassword) {
              res.status(400).json({ message: 'Password or email incorrect!' });
              return;
            }
        
          await req.session.save(() => {
              req.session.user_id = userLogin.id;
              req.session.name = userLogin.name;
              req.session.loggedIn = true;
        
              res.json({ user: userLogin, message: 'You are now logged in!' });
            });
    } catch {
        res.status(500).json({ message: 'Server Error'})
    }
    
});


  router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
});

//update user
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateUser = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
          }
        })
            if (!updateUser[0]) {
              res.status(404).json({ message: 'No user with this ID found!' });
              return;
            } else {
                res.json(updateUser);
            }
    } catch {
        res.status(500).json({ message: 'Server Error'})
    }
    
});

// delete a user 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: {
              id: req.params.id
            }
          })
              if (!deleteUser) {
                res.status(404).json({ message: 'No user with this ID found!' });
                return;
              }
              res.json(deleteUser);
    } catch {
        res.status(500).json({ message: 'Server Error'})
    }

})

module.exports = router;