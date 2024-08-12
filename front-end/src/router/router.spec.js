import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import HomeView from '../views/HomeView.vue';
import router from '../router';

describe('Vue Router', () => {
  it('should have the correct route configuration', () => {
    const routes = router.getRoutes();
    expect(routes).toHaveLength(1);
    expect(routes[0].name).toBe('home');
    expect(routes[0].path).toBe('/');

    const component = routes[0].components.default.__name;
    expect(component).toBe('HomeView');
  });

  it('should navigate to HomeView component', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    });

    await router.push('/');
    await router.isReady();
    expect(wrapper.find('.graph').exists()).toBe(true);
  });

  it('should create a router instance with Web History mode', () => {
    const routerInstance = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        }
      ]
    });
    expect(routerInstance.options.history).toBeInstanceOf(Object);
    expect(routerInstance.options.history.base).toBe('');
  });
});
