export function getComments(id, data = "") {
  return fetch("/news/" + id + "/comments", {
    method: "GET",
    body: undefined,
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());
}

export function postComment(id, data) {
  return fetchComments({ method: "POST", id, data });
}

export function patchComment(id, data) {
  return fetch("/news/" + id + "/comments/" + data._id, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());
}

export function deleteComment(id, data) {
  return fetch("/news/" + id + "/comments/" + data._id, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "x-auth-token": localStorage.getItem("jwtToken")
    }
  }).then(res => res.json());
}

function fetchComments({ method = "GET", id = "", data } = {}) {
  return fetch("/news/" + id + "/comments", {
    method,
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "x-auth-token": localStorage.getItem("jwtToken")
    }
  }).then(res => res.json());
}
