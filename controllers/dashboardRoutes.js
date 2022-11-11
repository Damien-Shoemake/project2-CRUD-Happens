const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// dashboard displaying posts created by logged in users 
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });

// rendering edit post page
router.get('/edit/:id', (req, res) => {
    res.render('edit-posts');
  });

// rendering new post page 
router.get('/newpost', (req, res) => {
    res.render('new-posts');
  });

module.exports = router;