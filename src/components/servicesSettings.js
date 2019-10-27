const token = localStorage.getItem("jwtToken");

export function getUser() {
  return fetch("/profile/me", {
    method: "GET",
    body: undefined,
    headers: {
      "content-type": "application/json",
      "x-auth-token": token
    }
  }).then(res => res.json());
}
