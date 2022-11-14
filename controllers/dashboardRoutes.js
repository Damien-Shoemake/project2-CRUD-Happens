const router = require("express").Router()
const { Post, User, Comment } = require("../models")
const withAuth = require("../utils/auth")

// dashboard displaying posts created by logged in users
router.get("/", withAuth, async (req, res) => {
  try {
    const dashboardPosts = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    })
    const posts = dashboardPosts.map((post) => post.get({ plain: true }))

    res.render("dashboard", { posts, logged_in: true, name: req.session.name })
  } catch {
    res.status(500).json({ message: "Server Error" })
  }
})

//edit a post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const editPost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    })

    if (!editPost) {
      res.status(404).json({ message: "No post with this ID found!" })
      return
    }

    // serialize the data
    const post = await editPost.get({ plain: true })

    res.render("edit-posts", {
      post,
      logged_in: true,
      name: req.session.name,
    })
  } catch {
    res.status(500).json({ message: "Server Error" })
  }
})

//create post
router.get("/newpost", withAuth, async (req, res) => {
  try {
    const createPost = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    })

    // serialize data before passing to template
    const posts = createPost.map((post) => post.get({ plain: true }))
    res.render("new-posts", { posts, logged_in: true, name: req.session.name })
  } catch {
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
