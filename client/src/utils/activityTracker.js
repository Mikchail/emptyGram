
const LS_LAST_ACTIVITY_AT_KEY = "example:last-active-at";
export function setLastActivity() {
  localStorage.setItem(LS_LAST_ACTIVITY_AT_KEY, Date.now());
}

export function getLastActivity() {
  return localStorage.getItem(LS_LAST_ACTIVITY_AT_KEY);
}
