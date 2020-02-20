import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './auth-guard';
import Home from '@/page/Home';
import AllPosts from '@/page/AllPosts';
import User from '@/page/User';
import Login from '@/components/Auth/Login';
import Admin from '@/components/Admin/Admin';
import Registration from '@/components/Auth/Registration';
import OnePost from '@/components/OnePost';
import Orders from '@/components/User/Orders';
import store from "../store";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
    },
    {
			path: '/allposts',
			name: 'Allposts',
      component: AllPosts,
      beforeEnter: AuthGuard
		},
		{
			path: '/post/:id',
			name: 'post',
			component: OnePost,
			props: true,
			beforeEnter: AuthGuard
			// exact: true
		},

		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/registration',
			name: 'Registration',
			component: Registration
		},
		{
			path: '/orders',
			name: 'Orders',
			component: Orders
		},
		{
			path: '/admin',
			name: 'Admin',
			component: Admin,
			beforeEnter: AuthGuard
		},
		{
			path: '/user',
			name: 'User',
			component: User,
			beforeEnter: AuthGuard
		}
	],
	mode: 'history'
});
router.beforeEach(async (to, from, next) => {
  const usr = await store.dispatch('getUserData');
  next();
	// if (store.getters.getUser) {
	// 	next()
	// } else {
	// 	next('/login?loginError=true')
	// }
});

export default router;
