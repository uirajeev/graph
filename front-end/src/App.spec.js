import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';
import Header from './components/Header/Header.vue';

describe('App.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(App);
    });
    it('renders Header and RouterView', () => {

        expect(wrapper.findComponent(Header).exists()).toBe(true);
    });

    it('applies the correct main class', () => {

        const main = wrapper.find('.main');
        expect(main.exists()).toBe(true);
        expect(main.classes()).toContain('main');
    });
});
