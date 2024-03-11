class Article {
  _id;
  link;
  headline;
  category;
  text;
  author;
  date;
  image;

  constructor(
    id, 
    link, 
    headline, 
    category, 
    text, 
    author, 
    date, 
    image
  ) {
    if (typeof id === String || id === null) {
      this._id = id;
    } else {
      throw new Error(`id: ${id} is not a string or null.`);
    }
    if (typeof link === String) {
      this.link = link;
    } else {
      throw new Error(`link: ${link} is not a string.`);
    }
    if (typeof headline === String) {
      this.headline = headline;
    } else {
      throw new Error(`headline: ${headline} is not a string.`);
    }
    if (typeof category === String) {
      this.category = category;
    } else {
      throw new Error(`category: ${category} is not a string.`);
    }
    if (typeof text === String) {
      this.text = text;
    } else {
      throw new Error(`text: ${text} is not a string.`);
    }
    if (typeof author === String) {
      this.author = author;
    } else {
      throw new Error(`author: ${author} is not a string.`);
    }
    if (typeof date === String) {
      const regex = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
      if (!regex.test(date)) {
        throw new Error('Date does not match the YYYY-MM-DD patern.');
      }
      this.date = date;
    } else {
      throw new Error(`date: ${date} is not a string.`);
    }
    if (typeof image === String) {
      this.image = image;
    } else {
      throw new Error(`image: ${image} is not a string.`);
    }
  }

  static createArticle(article) {
    if (this.isArticle(article)) {
      return new Article(
        article.id,
        article.link,
        article.headline,
        article.category,
        article.text,
        article.author,
        article.date,
        article.image
      );
    } else {
      throw new Error('The article is not a valid article');
    }
  }

  static isArticle(obj) {
    if (!(typeof obj.id === String || obj.id === null)) {
      return false;
    }
    if (typeof obj.link !== String) {
      return false;
    }
    if (typeof obj.headline !== String) {
      return false;
    }
    if (typeof obj.category !== String) {
      return false;
    }
    if (typeof obj.text !== String) {
      return false;
    }
    if (typeof obj.author !== String) {
      return false;
    }
    if (typeof obj.date !== String) {
      return false;
    }
    const regex = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!regex.test(obj.date)) {
      return false;
    }
    if (typeof obj.image !== String) {
      return false;
    }
    return true;
  }
}

module.exports = Article;