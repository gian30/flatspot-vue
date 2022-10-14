import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import ElementPlus from 'element-plus';


import 'element-plus/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/scss/main.scss';
import "leaflet/dist/leaflet.css";

import { createRouter, createWebHistory } from 'vue-router';
const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "about" */ '@/views/HomeView.vue')
	}
];
const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		if (to.hash) {
			return { el: to.hash };
		}
		return { x: 0, y: 0 };
	}
});

createApp(App).use(ElementPlus).use(router).use(createPinia()).mount('#app');
