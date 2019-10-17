export function postReview(data) {
  return fetch("/reviews", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());
}

export function getReviews() {
  return fetch("/reviews", {
    method: "GET",
    body: undefined,
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json());
}
