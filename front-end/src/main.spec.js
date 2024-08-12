import { describe, it, expect, vi } from 'vitest';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

import main from './main.js';

vi.mock('vue', async () => {
  const actualVue = await vi.importActual('vue');

  return {
    ...actualVue,
    createApp: vi.fn(() => ({
      use: vi.fn().mockReturnThis(),
      mount: vi.fn(),
    })),
  };
});

describe('Main application setup', () => {
  it('sets up and mounts the application', () => {
    // Assertions
    expect(createApp).toHaveBeenCalledWith(App);
    const appInstance = createApp.mock.results[0].value;
    expect(appInstance.use).toHaveBeenCalledWith(router);
    expect(appInstance.mount).toHaveBeenCalledWith('#app');
  });
});
