/* eslint-disable max-len */
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
          found: 'ARTICLE(S) FOUND',
          loading: 'LOADING...',
          by: 'by'
        },
        login: {
          strangerTitle: 'Hello Stranger',
          strangerText: 'Sign in to discover great news, post thoughtful comments and more!'
        },
        profile: {
          loading: 'Loading...',
          credibility: 'Credibility',
          about: 'ABOUT',
          posts: 'ALL POSTS'
        },
        post: {
          upload: 'Upload Article',
          headline: 'Article Headline:',
          description: 'Article Description:',
          url: 'Url of original article:',
          category: 'Category:',
          uploadImage: 'Upload image'
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
          found: 'ARTICLE(S) TROUVÉ(S)',
          loading: 'CHARGEMENT...',
          by: 'par'
        },
        login: {
          strangerTitle: 'Bonjour étranger',
          strangerText: 'Connectez-vous pour découvrir de bonnes nouvelles, publier des commentaires réfléchis et bien plus encore !'
        },
        profile: {
          loading: 'Chargement...',
          credibility: 'Crédibilité',
          about: 'À PROPOS',
          posts: 'TOUS LES MESSAGES'
        },
        post: {
          upload: `Télécharger l'article`,
          headline: `Titre de l'article :`,
          description: `Description d'article:`,
          url: `URL de l'article original :`,
          category: 'Catégorie:',
          uploadImage: 'Télécharger une image'
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
          found: 'ARTÍCULO(S) ENCONTRADO(S)',
          loading: 'CARGANDO...',
          by: 'por'
        },
        login: {
          strangerTitle: 'Hola extraño',
          strangerText: '¡Inicie sesión para descubrir excelentes noticias, publicar comentarios interesantes y más!'
        },
        profile: {
          loading: 'Cargando...',
          credibility: 'Credibilidad',
          about: 'ACERCA DE',
          posts: 'TODOS LOS MENSAJES'
        },
        post: {
          upload: 'Cargar artículo',
          headline: 'Titular del artículo:',
          description: 'Descripción del articulo:',
          url: 'URL del artículo original:',
          category: 'Categoría:',
          uploadImage: 'Cargar imagen'
        }
      }
    }
  }
});

export default i18n;