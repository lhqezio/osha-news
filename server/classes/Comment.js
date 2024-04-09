/**
 * Class representing an Comment
 */
class Comment {
  _id;
  postId;
  email;
  name;
  comment;

  /**
   * Comment Constructor
   * @param {string | null} id Id of the comment
   * @param {string} postId Id of the article
   * @param {string} email Email of the commenter
   * @param {string} name Name of the commenter
   * @param {string} comment Comment
   */
  constructor(
    _id,
    postId,
    email,
    name,
    comment
  ) {
    if (_id === undefined || typeof _id === 'string' || _id === null) {
      this._id = _id;
    } else {
      throw new Error(`id: ${_id} is not a string or null.`);
    }
    if (typeof postId === 'string') {
      this.postId = postId;
    } else {
      throw new Error(`postId: ${postId} is not a string.`);
    }
    if (typeof email === 'string') {
      this.email = email;
    } else {
      throw new Error(`email: ${email} is not a string.`);
    }
    if (typeof name === 'string') {
      this.name = name;
    } else {
      throw new Error(`name: ${name} is not a string.`);
    }
    if (typeof comment === 'string') {
      this.comment = comment;
    } else {
      throw new Error(`comment: ${comment} is not a string.`);
    }
  }

  /**
   * Get this Comment without an id
   * @returns {Comment} Comment object with no id
   */
  getCommentNoId() {
    return {
      link: this.link,
      headline: this.headline,
      category: this.category,
      text: this.text,
      authors: this.authors,
      date: this.date,
      image: this.image
    };
  }

  /**\
   * Creates an Comment with an existing comment
   * @param {Comment} comment Comment to transform into a Comment
   * @returns {Comment} Comment
   * @throws Error invalid comment
   */
  static createComment(comment) {
    if (this.isComment(comment)) {
      return new Comment(
        comment._id,
        comment.postId,
        comment.email,
        comment.name,
        comment.comment
      );
    } else {
      throw new Error('The comment is not a valid comment');
    }
  }

  /**
   * Check if an object is a Comment
   * @param {Comment} obj Comment
   * @returns {Boolean} True if valid Comment
   */
  static isComment(obj) {
    if (!(obj._id === undefined || typeof obj._id === 'string' || obj._id === null)) {
      return false;
    }
    if (typeof obj.postId !== 'string') {
      return false;
    }
    if (typeof obj.email !== 'string') {
      return false;
    }
    if (typeof obj.name !== 'string') {
      return false;
    }
    if (typeof obj.comment !== 'string') {
      return false;
    }
    return true;
  }
}

module.exports = Comment;