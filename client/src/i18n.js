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
        home: {
          title: 'OSHA News',
          categories: 'Categories',
          user: 'User'
        },
        article: {
          moreInfo: 'Read More'
        },
        error: {
          error: 'Error!',
          fetch: 'Server fetching error',
          connection: 'Connection issue occured',
          unexpected: 'Unexpected error has occurred'
        }
      }
    },
    fr: {
      translation: {
        home: {
          title: 'OSHA News',
          categories: 'Catégories',
          user: 'Utilisateur'
        },
        article: {
          moreInfo: 'En savoir plus'
        },
        error: {
          error: 'Erreur!',
          fetch: 'Erreur de récupération du serveur',
          connection: 'Un problème de connexion est survenu',
          unexpected: `Une erreur inattendue s'est produite`
        }
      }
    },
    es: {
      translation: {
        home: {
          title: 'OSHA News',
          categories: 'Categorías',
          user: 'Usuario'
        },
        article: {
          moreInfo: 'Leer más'
        },
        error: {
          error: 'Error!',
          fetch: 'Error al recuperar el servidor',
          connection: 'Ocurrió un problema de conexión',
          unexpected: 'Se ha producido un error inesperado'
        }
      }
    }
  }
});

export default i18n;