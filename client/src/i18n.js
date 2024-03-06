import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  falbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: {
        homeText: {
          title: 'OSHA News',
          categories: 'Categories',
          user: 'User'
        },
        article: {
          moreInfo: 'Read More'
        },
        error: {
          error: 'Error!',
          fetch: 'server fetching error',
          connection: 'Connection issue occured',
          unexpected: 'Unexpected error has occurred.'
        }
      }
    },
    fr: {
      translation: {
        homeText: {
          title: 'OSHA News',
          categories: 'Categories',
          user: 'User'
        },
        article: {
          moreInfo: 'Read More'
        },
        error: {
          error: 'Error!',
          fetch: 'server fetching error',
          connection: 'Connection issue occured',
          unexpected: 'Unexpected error has occurred.'
        }
      }
    },
    es: {
      translation: {
        homeText: {
          title: 'OSHA News',
          categories: 'Categories',
          user: 'User'
        },
        article: {
          moreInfo: 'Read More'
        },
        error: {
          error: 'Error!',
          fetch: 'server fetching error',
          connection: 'Connection issue occured',
          unexpected: 'Unexpected error has occurred.'
        }
      }
    }
  }
});

export default i18n;