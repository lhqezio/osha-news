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
          categories: 'FILTER',
          user: 'User',
          login: 'Login',
          logout: 'Logout'
        },
        article: {
          moreInfo: 'Read More'
        },
        error: {
          error: 'Error!',
          fetch: 'Server fetching error',
          connection: 'Connection issue occured',
          unexpected: 'Unexpected error has occurred, Contact the administrator'
        },
        search: {
          found: ' ARTICLE(S) FOUND'
        }
      }
    },
    fr: {
      translation: {
        home: {
          title: 'OSHA News',
          categories: 'FILTRE',
          user: 'Utilisateur',
          login: 'Se Connecter',
          logout: 'Se Déconnecter'
        },
        article: {
          moreInfo: 'En savoir plus'
        },
        error: {
          error: 'Erreur!',
          fetch: 'Erreur de récupération du serveur',
          connection: 'Un problème de connexion est survenu',
          unexpected: `Une erreur inattendue s'est produite`
        },
        search: {
          found: 'ARTICLE(S) TROUVÉ(S)'
        }
      }
    },
    es: {
      translation: {
        home: {
          title: 'OSHA News',
          categories: 'FILTRA',
          user: 'Usuario',
          login: 'Acceso',
          logout: 'Cerrar Sesión'
        },
        article: {
          moreInfo: 'Leer más'
        },
        error: {
          error: 'Error!',
          fetch: 'Error al recuperar el servidor',
          connection: 'Ocurrió un problema de conexión',
          unexpected: 'Se ha producido un error inesperado'
        },
        search: {
          found: 'ARTÍCULO(S) ENCONTRADO(S)'
        }
      }
    }
  }
});

export default i18n;