import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginView.vue";
import Theme from "@/views/ThemeView.vue";
import Image from "@/views/ImageView.vue";
import Product from "@/views/ProductView.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/theme",
        name: "테마",
        component: Theme,
    },
    {
        path: "/image",
        name: "이미지",
        component: Image,
    },
    {
        path: "/product",
        name: "상품",
        component: Product,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;