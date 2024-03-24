/**
 * Class representing an Article
 */
class User {
  _id;
  email;
  name;
  posts;
  image;

  /**
   * User Constructor
   * @param {string | null} id Id of the user
   * @param {string} email email for user (unique/primary key)
   * @param {string} name name for user
   * @param {Array} posts posts associated to the user
   * @param {string} image image for user
   */
  constructor(
    id, 
    email,
    name,
    posts,
    image
  ) {
    if (typeof id === 'string' || id === null) {
      this._id = id;
    } else {
      throw new Error(`id: ${id} is not a string or null.`);
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
    if (Array.isArray(posts)) {
      this.posts = posts;
    } else {
      throw new Error(`posts: ${posts} is not an array.`);
    }
    if (typeof image === 'string') {
      this.image = image;
    } else {
      throw new Error(`image: ${image} is not a string.`);
    }
  }

  /**
   * Get this user without an id
   * @returns User object with no id
   */
  getUserNoId() {
    return {
      email: this.email,
      name: this.name,
      posts: this.posts,
      image: this.image,
    };
  }

  /**\
   * Creates an User with an existing user
   * @returns User
   * @throws Error invalid user
   */
  static createUser(user) {
    if (this.isUser(user)) {
      return new User(
        user._id,
        user.email,
        user.name,
        user.posts,
        user.image,
      );
    } else {
      throw new Error('The user is not a valid article');
    }
  }

  /**
   * Check if an object is an user
   * @param {User} obj user
   * @returns Boolean
   */
  static isUser(obj) {
    if (!(typeof obj._id === 'string' || obj._id === null)) {
      console.log(0);
      return false;
    }
    if (typeof obj.email !== 'string') {
      return false;
    }
    if (typeof obj.name !== 'string') {
      return false;
    }
    if (Array.isArray(obj.posts)) {
      return false;
    }
    if (typeof obj.image !== 'string') {
      return false;
    }
    return true;
  }
}

module.exports = User;