const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')
const Bucketlist = require('./Bucketlist')


User.hasMany(Post, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

User.hasMany(Bucketlist, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Bucketlist.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Comment, Bucketlist };
