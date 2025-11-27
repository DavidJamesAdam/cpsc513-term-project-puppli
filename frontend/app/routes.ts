import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("settings", "routes/settings.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("message", "routes/message.tsx"),
  route("ranking", "routes/ranking.tsx"),
  route("profile", "routes/profile.tsx"),
  route("all-users", "routes/all-users.tsx"),
] satisfies RouteConfig;
