const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get dashboard posts
router.get('/', withAuth, async (req, res) => {
  try {
    const dashboardPosts = Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          'post_content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['name']
            }
          },
          {
            model: User,
            attributes: ['name']
          }
        ]
      })
          const posts = await dashboardPosts.map(post => post.get({ plain: true }));
          res.render('dashboard', { posts, loggedIn: true });

  } catch {
    res.status(404).json({message: 'Server Error'})
  }
}) 

//edit a post
router.get('/edit/:id', withAuth, async (req, res) => {
  try 
  {
    const editPost = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          'post_content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        
          if (!editPost) {
            res.status(404).json({ message: 'No post with this ID found!' });
            return;
          }
    
          // serialize the data
          const post = await editPost.get({ plain: true });
  
        await  res.render('edit-posts', {
              post,
              loggedIn: true
              });

  } 
  catch 
  {
    res.status(500).json({ message: 'Server Error'})
  }  
})

//create post
router.get('/create/', withAuth, async (req, res) => {
  try 
  {

    const createPost = await Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          'post_content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        
          // serialize data before passing to template
          const posts = await createPost.map(post => post.get({ plain: true }));
          await res.render('new-posts', { posts, loggedIn: true });
  } 
  catch 
  {
    res.status(500).json({ message: 'Server Error'})
  }  

})


module.exports = router;