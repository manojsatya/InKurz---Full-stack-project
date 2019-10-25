export function postRegisterUser(data) {
  return fetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());
}

export function postLoginUser(data) {
  return fetch("/auth", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());
}
