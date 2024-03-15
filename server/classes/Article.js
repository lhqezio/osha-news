class Article {
  _id;
  link;
  headline;
  category;
  text;
  authors;
  date;
  image;

  constructor(
    id, 
    link, 
    headline, 
    category, 
    text, 
    authors, 
    date, 
    image
  ) {
    if (typeof id === 'string' || id === null) {
      this._id = id;
    } else {
      throw new Error(`id: ${id} is not a string or null.`);
    }
    if (typeof link === 'string') {
      this.link = link;
    } else {
      throw new Error(`link: ${link} is not a string.`);
    }
    if (typeof headline === 'string') {
      this.headline = headline;
    } else {
      throw new Error(`headline: ${headline} is not a string.`);
    }
    if (typeof category === 'string') {
      this.category = category;
    } else {
      throw new Error(`category: ${category} is not a string.`);
    }
    if (typeof text === 'string') {
      this.text = text;
    } else {
      throw new Error(`text: ${text} is not a string.`);
    }
    if (typeof authors === 'string') {
      this.authors = authors;
    } else {
      throw new Error(`author: ${authors} is not a string.`);
    }
    if (typeof date === 'string') {
      const regex = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
      if (!regex.test(date)) {
        throw new Error('Date does not match the YYYY-MM-DD patern.');
      }
      this.date = date;
    } else {
      throw new Error(`date: ${date} is not a string.`);
    }
    if (typeof image === 'string') {
      this.image = image;
    } else {
      throw new Error(`image: ${image} is not a string.`);
    }
  }

  static createArticle(article) {
    if (this.isArticle(article)) {
      return new Article(
        article._id,
        article.link,
        article.headline,
        article.category,
        article.text,
        article.authors,
        article.date,
        article.image
      );
    } else {
      throw new Error('The article is not a valid article');
    }
  }

  static isArticle(obj) {
    if (!(typeof obj._id === 'string' || obj._id === null)) {
      console.log(0);
      return false;
    }
    if (typeof obj.link !== 'string') {
      return false;
    }
    if (typeof obj.headline !== 'string') {
      return false;
    }
    if (typeof obj.category !== 'string') {
      return false;
    }
    if (typeof obj.text !== 'string') {
      return false;
    }
    if (typeof obj.authors !== 'string') {
      return false;
    }
    if (typeof obj.date !== 'string') {
      return false;
    }
    const regex = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!regex.test(obj.date)) {
      return false;
    }
    if (typeof obj.image !== 'string') {
      return false;
    }
    return true;
  }
}

module.exports = Article;