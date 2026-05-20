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
