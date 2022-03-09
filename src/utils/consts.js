export const LOGIN_ROUTE = "/signin";
export const REGISTRATION_ROUTE = "/signup";
export const LANDING_ROUTE = "/";
export const PROFILE_ROUTE = "/profile";
export const MOVIES_ROUTE = "/movies";
export const SAVED_MOVIES_ROUTE = "/saved-movies";
export const NOTFOUND_ROUTE = "*";
export const localhost = "http://localhost:3000";
export const BACKEND_URL = "https://backend-savedmovies-yandex.herokuapp.com";
export const API_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const API_PREFIX = "https://api.nomoreparties.co";
export const SUCCESS_MESSAGE = "Обновление успешно!";
export const USERNAME_PATTERN_CHECK = "[а-яА-ЯёЁa-zA-Z- ]{1,}";
export const EMAIL_PATTERN =
  "^[a-zA-Z0-9_'+*/^&=?~{}-](.?[a-zA-Z0-9_'+*/^&=?~{}-])*@((d{1,3}.d{1,3}.d{1,3}.d{1,3}(:d{1,3})?)|(((([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])|([a-zA-Z0-9]{1,2}))[.]{1})+([a-zA-Z]{2,6})))$";
export const SHORT_MOVIE_DURATION = 40;
export const CARDS_AT_SCREEN = {
  pcMonitor: {
    width: 1280,
    cardsPerPage: 12,
    addCards: 3,
  },
  tabletPc: {
    width: 768,
    cardsPerPage: 8,
    addCards: 2,
  },
  mobileScreen: {
    width: 480,
    cardsPerPage: 5,
    addCards: 1,
  },
};
