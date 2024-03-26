import axios from "axios";
export const http = axios.create({
  // endpoint
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OCIsIkhldEhhblN0cmluZyI6IjEzLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjcyNjQwMDAwMCIsIm5iZiI6MTcwOTEzOTYwMCwiZXhwIjoxNzM2ODc0MDAwfQ.n0CJ7Z1aQW6lhiwBam-xYFGQG_-OjNb9crCOxvjDWZg",
  },
  timeout: 30000,
});
