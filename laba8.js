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
class OAuthStrategy {
  constructor(getToken) {
    this.getToken = getToken;
  }

  apply(headers) {
    headers["Authorization"] = `OAuth ${this.getToken()}`;
    return headers;
  }
}
class AuthProxy {
  constructor(client, strategy) {
    this.client = client;
    this.strategy = strategy;
  }

  async request(req) {
    let headers = req.headers || {};

    headers = this.strategy.apply(headers);

    return this.client.request({
      ...req,
      headers,
    });
  }
}
class LoggingProxy {
  constructor(client) {
    this.client = client;
  }

  async request(req) {
    console.log("[REQUEST]", req.url);

    const res = await this.client.request(req);

    console.log("[RESPONSE]", res.status);

    return res;
  }
}
class GitHubService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getUser(username) {
    return this.httpClient.request({
      url: `https://api.github.com/users/${username}`,
      method: "GET",
    });
  }
}
const baseClient = new BaseHttpClient();
const strategy = new JwtStrategy(() => "FAKE_TOKEN");
const authClient = new AuthProxy(baseClient, strategy);
const client = new LoggingProxy(authClient);
const service = new GitHubService(client);
service.getUser("octocat").then((res) => {
  console.log("User data:", res.data);
});
