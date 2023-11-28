const PROXY_CONFIG = [
  {
    context: ["/api"],
    // target: "http://localhost:8080/",
    target: "http://localhost:2020/",
    secure: false,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
