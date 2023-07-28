export function saveAccessTokenToLocalStorage(accessToken: string): void {
  localStorage.setItem("accessToken", accessToken);
}
