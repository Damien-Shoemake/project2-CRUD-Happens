const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all posts
router.get('/', async (req, res) => {
    try 
    {
        const allPosts = await Post.findAll({
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id, comment', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            },
        ]
    })

    res.json(allPosts)
 } 
 catch(e) {

    res.status(500).json({ message: 'Server Error'})
    }
})

//get one post

router.get('/:id', async (req, res) => {
    try {
        const onePost = await Post.findOne({
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
                // include the Comment model here:
                {
                  model: User,
                  attributes: ['name']
                },
                {
                  model: Comment,
                  attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['name']
                  }
                }
            ]   
            }
        )
    
        if (!onePost) {
            res.status(404).json({ message: 'No post with this ID found!'})
            return;
        } else {
            res.json(onePost)
        }
    }
    catch(e){
        res.status(500).json({ message: 'Server Error'})
    }
    
})

//create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        })
    
        res.json(newPost)
    } catch(e) {
        res.status(500).json({ message: 'Server Error'})
    }

})

//update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
       const updatePost = Post.update({
            title: req.body.title,
            post_content: req.body.post_content
          },
          {
            where: {
              id: req.params.id
            }
          })

          if (!updatePost) {
            res.status(404).json({ message: 'No post with this ID found!'});
            return;
          } else {
            res.json(updatePost)
          }
    } catch(e) {
        res.status(500).json({ message: 'Server error'})
    }
})

//delete a post

router.delete('/:id', withAuth, (req, res) => {
    
    try {
        const deletePost = Post.delete({
            where: {
                id: req.params.id
            }
        });
    
        if(!deletePost) {
            res.status(404).json({ message: 'No post with this ID found!'});
            return;
        } else {
            res.json(deletePost);
        }

    } catch(e) {
        res.status(500).json({ message: 'Server Error'})
    }
})

module.exports = router;