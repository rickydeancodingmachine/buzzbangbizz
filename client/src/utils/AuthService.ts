import * as decodeJwt from 'jwt-decode';

export interface DecodedToken {
  jti?: string;
  iat: number;
  exp: number;
  sub: string;
  scopes: { [key: string]: boolean };
  email: string;
}
const ID_TOKEN_KEY = 'buzzbangbizz_rickytest_jwt_token';

export function logout() {
  clearIdToken();
}

export function login(token: string) {
  const loggedIn = setIdToken(token);
  if (loggedIn) {
    return true;
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

// Get and store id_token in local storage
export function setIdToken(idToken: any) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
  return true;
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken: any) {
  const token = decodeJwt<DecodedToken>(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token: any) {
  const expirationDate = getTokenExpirationDate(token);
  if (expirationDate) {
    return expirationDate < new Date();
  } else {
    return null;
  }
}
