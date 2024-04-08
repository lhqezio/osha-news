const Comment = require('../classes/Comment');
const { 
  addComment,
  getComments 
} = require('../db/db');

/**
 * Express Controller
 * Insert One comment to the database
 * @param {Express.Request} req Request made by api
 * @param {Express.Response} res Response made by api
 * @param {Comment} req.body.comment Comment to add to the database
 */
module.exports.addComment = async (req, res) => {
  if (!req.session.name) {
    res.status(401).json({'error' : 'Not logged in'});
    return;
  }
  if (Comment.isComment(req.body.comment)) {
    try {
      const comment = Comment.createComment(req.body.comment);
      
      try {
        const newComment = await addComment(comment);
        res.status(201).json({
          'status': 'Added comment',
          'comment': newComment
        });
      } catch (_) {
        res.status(500).json({'error' : 'Internal Error'});
        return;
      }
    } catch (err) {
      res.status(400).json({'error': err.message});
      return;
    }
  } else {
    res.status(400).json({'error': 'No comment provided'});
    return;
  }
};

/**
 * Express Controller
 * Get all comment of specific post id
 * @param {Express.Request} req Request made by api
 * @param {Express.Response} res Response made by api
 * @param {Comment} req.query.id Comment to add to the database
 */
module.exports.getComments = async (req, res) => {
  if (!req.query.id) {
    res.status(400).json({'error': 'No article id provided'});
    return;
  }
  const postId = req.query.id;
  try {
    const comments = await getComments(postId);
    res.status(200).json(comments);
  } catch (_) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};