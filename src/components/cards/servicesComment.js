export function getComments() {
  return fetchComments();
}

export function postComment(id, data) {
  return fetchComments({ method: "POST", id, data });
}

function fetchComments({ method = "GET", id = "", data } = {}) {
  return fetch("/news/" + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());
}
