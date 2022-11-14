const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({})
          res.json(comments)
        
    } catch {
        res.status(500).json({ message: 'Server Error' })
    }
});

//post a comment 
router.post('/', withAuth, async (req, res) => {
    try{
        if (req.session) {
        const newComment = await Comment.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
          })

        res.json(newComment)
        }
        
    } catch {
        res.status(500).json({ message: 'Server Error'})
    }
});

//delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
              id: req.params.id
            }
          })
        
          if(!deleteComment) {
                res.status(404).json({ message: 'No comment with this ID found!' });
                return;
    }
            res.json(deleteComment);
        
    } catch {
        res.status(500).json({ message: 'Server Error'})
    }
});

module.exports = router;