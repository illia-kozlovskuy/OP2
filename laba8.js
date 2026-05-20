class BaseHttpClient {
  async request(req) {
    const response = await fetch(req.url, {
      method: req.method || "GET",
    });

    const data = await response.json();

    return {
      status: response.status,
      data,
    };
  }
}
class JwtStrategy {
  constructor(getToken) {
    this.getToken = getToken;
  }

  apply(headers) {
    headers["Authorization"] = `Bearer ${this.getToken()}`;
    return headers;
  }
}
class ApiKeyStrategy {
  constructor(getKey) {
    this.getKey = getKey;
  }

  apply(headers) {
    headers["x-api-key"] = this.getKey();
    return headers;
  }
}