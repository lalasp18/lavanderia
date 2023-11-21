const PROXY_CONFIG = [
  {
    context: ["/api"],
    // target: "http://localhost:2020/",
    target: "http://localhost:8080/",
    secure: false,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
