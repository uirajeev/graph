import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Toast from './Toast.vue';

describe('Toast', () => {
  let wrapper;
  let callbackSpy;

  beforeEach(() => {
    callbackSpy = vi.fn();
    wrapper = mount(Toast, {
      propsData: { 
        data: { name: 'B', description: 'Description of B' },
        callback: callbackSpy 
      }
    });
  });

  it('renders properly', () => {
    expect(wrapper.vm.data.name).toEqual('B');
    expect(wrapper.vm.data.description).toEqual('Description of B');
  });

  it('renders title text properly', () => {
    expect(wrapper.find('strong').text()).toContain('Node name: B');
  });

  it('renders description text properly', () => {
    expect(wrapper.find('.toast-body').text()).toContain('Description of B');
  });

  it('calls callback function when click on close button', async () => {
    await wrapper.find('.close').trigger('click');
    expect(callbackSpy).toHaveBeenCalled();
  });
});
