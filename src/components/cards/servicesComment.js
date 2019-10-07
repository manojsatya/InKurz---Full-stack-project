export function getComments() {
  return fetchComments();
}

export function postComment(data) {
  return fetchComments({ method: "POST", data });
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
