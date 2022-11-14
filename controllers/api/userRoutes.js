const router = require("express").Router()
const { User, Post, Comment } = require("../../models")
const withAuth = require("../../utils/auth")

// GET /api/user, get all the users
router.get("/", async (req, res) => {
  // Access our User model and run .findAll() method
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    })
    res.status(200).json(users)
  } catch {
    res.status(500).json({ message: "Server Error" })
  }
})

// GET /api/user/id, set a single user by id
router.get("/:id", async (req, res) => {
  try {
    const newUser = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_content", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    })
    if (!newUser) {
      res.status(404).json({ message: "No user with that ID found!" })
    } else {
      res.json(newUser)
    }
  } catch {
    res.status(500).json({ message: "Server Error" })
  }
})

// Post api/user, create a new user in db
// This is where it connects to login.js and fires the fetch('/api/user) -> sign up
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    req.session.save(() => {
      req.session.user_id = newUser.id
      req.session.name = newUser.name
      req.session.logged_in = true

      res.status(201).json(newUser)
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

// POST api/user/login Login route
// This is where it connects to login.js and fires the fetch('/api/user/login) -> login
router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({
      where: {
        name: req.body.name,
      },
    })
    console.log(userLogin)
    if (!userLogin) {
      res.status(400).json({ message: "Password incorrect!" })
      return
    }

    const validPassword = userLogin.checkPassword(req.body.password)

    if (!validPassword) {
      res.status(400).json({ message: "Password incorrect!" })
      return
    }

    req.session.save(() => {
      req.session.user_id = userLogin.id
      req.session.name = userLogin.name
      req.session.logged_in = true

      res.json({ user: userLogin, message: "You are now logged in!" })
    })
  } catch {
    res.status(500).json({ message: "Server Error" })
  }
})

// POST /api/user, log out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
