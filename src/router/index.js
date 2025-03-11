import { createRouter, createWebHistory } from 'vue-router';
import {
    HomeView, MainView, FeedView, SignUpView, SignInView, ProfileView, SettingsView, SubscriptionsView, SidebarMenuView, SearchView
} from '@/views/exporter.js';
import { useUserStore } from '@/stores/userStore';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: false },
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignInView,
            meta: { requiresAuth: false },
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUpView,
            meta: { requiresAuth: false },
        },
        {
            path: '/main',
            name: '',
            component: MainView,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'main',
                    components: {
                        leftSideBar: SidebarMenuView,
                        centerFocusBar: FeedView,
                        rightSideBar: SearchView,
                    },
                    // meta: { requiresAuth: true },
                },
                {
                    path: '/settings',
                    name: 'settings',
                    components: {
                        leftSideBar: SidebarMenuView,
                        centerFocusBar: SettingsView,
                    },
                    // meta: { requiresAuth: true },
                },
                {
                    path: '/profile',
                    name: 'profile',
                    components: {
                        leftSideBar: SidebarMenuView,
                        centerFocusBar: ProfileView,
                    },
                    // meta: { requiresAuth: true },
                },
                {
                    path: '/profile/subscriptions',
                    name: 'profile-subscriptions',
                    components: {
                        leftSideBar: SidebarMenuView,
                        centerFocusBar: SubscriptionsView,
                    },
                    // meta: { requiresAuth: true },
                },
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
});

// isAuthenticated Guard
router.beforeEach((to, from) => {
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.getIsAuthenticated) {
        return {
            path: '/',
        };
    }

    return true;
});

export default router;