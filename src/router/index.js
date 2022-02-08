import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/PageHome";
import Calendar from "@/pages/PageCalendar";
import Authorization from "@/pages/PageAuthorization"

const routes = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/login",
    name: "Login",
    component: Authorization

  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
