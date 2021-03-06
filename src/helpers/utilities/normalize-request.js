function normalizeRequest(req = {}) {
  return Object.freeze({
    host: req.hostname,
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
    instance: req.user,
  });
}

function objectHandler(data) {
  return { data };
}

export { normalizeRequest, objectHandler };
