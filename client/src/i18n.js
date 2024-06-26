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
          newArticle: 'New Article',
          login: 'Login',
          logout: 'Logout',
          close: 'CLOSE',
          goto: 'GO TO PROFILE',
          startScroll: 'CLICK HERE TO START SCROLLING',
          scrollInstruction: `ADD TO HOME SCREEN THEN CLICK HERE IF YOU'RE ON SAFARI MOBILE (NOT RECOMMENDED)`
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
          noArticle: 'NO ARTICLE FOUND',
          by: 'by',
          loadMore: 'LOAD MORE',
          enter: 'ENTER A SEARCH TERM',
          userFound: 'USER(S) FOUND'
        },
        login: {
          strangerTitle: 'Hello Stranger',
          strangerText: 'Sign in to discover great news, post thoughtful comments and more!'
        },
        profile: {
          loading: 'Loading...',
          credibility: 'Credibility',
          about: 'ABOUT',
          posts: 'ALL POSTS',
          allPost: 'ALL POSTS',
          articleDelete: 'DELETE',
          edit: 'EDIT',
          save: 'SAVE'
        },
        post: {
          upload: 'Upload Article',
          headline: 'Article Headline:',
          description: 'Article Description:',
          url: 'Url of original article:',
          category: 'Category:',
          uploadImage: 'Upload image',
          submit: 'Submit'
        },
        comment: {
          comment: 'Comment',
          noComment: 'No Comments'
        }
      }
    },
    fr: {
      translation: {
        home: {
          title: 'OSHA News',
          categories: 'FILTRE',
          user: 'Utilisateur',
          newArticle: 'Nouvel article',
          login: 'Se Connecter',
          logout: 'Se Déconnecter',
          close: 'FERMER',
          goto: 'ALLER AU PROFIL',
          startScroll: 'CLIQUEZ ICI POUR COMMENCER LE DÉFILEMENT',
          scrollInstruction: `AJOUTER À L'ÉCRAN D'ACCUEIL PUIS CLIQUEZ ICI SI VOUS ÊTES SUR SAFARI MOBILE (NON RECOMMANDÉ)`
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
          noArticle: 'AUCUN ARTICLE TROUVÉ',
          by: 'par',
          loadMore: 'CHARGER PLUS',
          enter: 'ENTREZ UN TERME DE RECHERCHE',
          userFound: 'UTILISATEUR(S) TROUVÉ(S)'
        },
        login: {
          strangerTitle: 'Bonjour étranger',
          strangerText: 'Connectez-vous pour découvrir de bonnes nouvelles, publier des commentaires réfléchis et bien plus encore !'
        },
        profile: {
          loading: 'Chargement...',
          credibility: 'Crédibilité',
          about: 'À PROPOS',
          posts: 'TOUS LES MESSAGES',
          allPost: 'TOUS LES ARTICLES',
          articleDelete: 'SUPPRIMER',
          edit: 'MODIFIER',
          save: 'SAUVEGARDER'
        },
        post: {
          upload: `Télécharger l'article`,
          headline: `Titre de l'article :`,
          description: `Description d'article:`,
          url: `URL de l'article original :`,
          category: 'Catégorie:',
          uploadImage: 'Télécharger une image',
          submit: 'Soumettre'
        },
        comment: {
          comment: 'Commentaire',
          noComment: 'Pas de commentaires'
        }
      }
    },
    es: {
      translation: {
        home: {
          title: 'OSHA News',
          categories: 'FILTRA',
          user: 'Usuario',
          newArticle: 'Articulo nuevo',
          login: 'Acceso',
          logout: 'Cerrar Sesión',
          close: 'CERCA',
          goto: 'IR AL PERFIL',
          startScroll: 'HAGA CLIC AQUÍ PARA COMENZAR A DESPLAZARSE',
          scrollInstruction: `AGREGAR A LA PANTALLA DE INICIO Y LUEGO HAGA CLIC AQUÍ SI ESTÁ EN SAFARI MOBILE (NO RECOMENDADO)`
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
          noArticle: 'NO SE ENCONTRÓ ARTÍCULO',
          by: 'por',
          loadMore: 'CARGA MÁS',
          enter: 'INGRESE UN TÉRMINO DE BÚSQUEDA',
          userFound: 'USUARIO(S) ENCONTRADO(S)'
        },
        login: {
          strangerTitle: 'Hola extraño',
          strangerText: '¡Inicie sesión para descubrir excelentes noticias, publicar comentarios interesantes y más!'
        },
        profile: {
          loading: 'Cargando...',
          credibility: 'Credibilidad',
          about: 'ACERCA DE',
          posts: 'TODOS LOS MENSAJES',
          allPost: 'TODOS LOS ARTÍCULOS',
          articleDelete: 'BORRAR',
          edit: 'EDITAR',
          save: 'AHORRAR'
        },
        post: {
          upload: 'Cargar artículo',
          headline: 'Titular del artículo:',
          description: 'Descripción del articulo:',
          url: 'URL del artículo original:',
          category: 'Categoría:',
          uploadImage: 'Cargar imagen',
          submit: 'Entregar'
        },
        comment: {
          comment: 'Comentario',
          noComment: 'Sin comentarios'
        }
      }
    }
  }
});

export default i18n;