import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: Home,
        login: Login
      },
      children: [
        {
          path: "/course1",
          name: "course1",
          component: () => import("./views/Course1.vue")
        },
        {
          path: "/course2",
          name: "course2",
          component: () => import("./views/Course2.vue")
        },
        {
          path: "/cslist",
          name: "cslist",
          component: () => import("./views/CourseTestList.vue")
        },
        {
          path: "/demo",
          name: "demo",
          component: () => import("./views/Demo.vue")
        },
        {
          path: "/jiaoxue",
          name: "jiaoxue",
          component: () => import("./views/Jiaoxue.vue")
        },
        {
          path: "/testmanage",
          name: "testmanage",
          component: () => import("./views/TestManage.vue")
        },
        {
          path: "/platdesc",
          name: "platdesc",
          component: () => import("./views/PlatDesc.vue")
        },
        {
          path: "/downloads",
          name: "downloads",
          component: () => import("./views/Downloads.vue")
        },
        {
          path: "/notices",
          name: "notices",
          component: () => import("./views/Notices.vue")
        },
        {
          path: "/ques",
          name: "ques",
          component: () => import("./views/Ques.vue")
        },
        {
          path: "/usedesc",
          name: "usedesc",
          component: () => import("./views/UseDesc.vue")
        },
        {
          path: "/class",
          name: "class",
          component: () => import("./views/Class.vue")
        },
        {
          path: "/stu",
          name: "stu",
          component: () => import("./views/Student.vue")
        },
        {
          path: "/adminManage",
          name: "adminManage",
          component: () => import("./views/AdminManage.vue")
        }
      ]
    }
  ]
});
