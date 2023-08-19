const redirectKey = "sign_in_redirect";

export function setRedirect(redirect) {
  window.sessionStorage.setItem(redirectKey, redirect);
}

export function getRedirect() {
  return window.sessionStorage.getItem(redirectKey);
}

export function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey);
}
