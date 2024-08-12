import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Toast from '../components/Toast/Toast.vue';
import { useGraph } from '../composables/useGraph';
import { computed } from 'vue';
import HomeView from './HomeView.vue';

// Mock the useGraph composable
vi.mock('../composables/useGraph', () => ({
  useGraph: vi.fn(),
}));

describe('Component Test', () => {
  it('renders the graph container', () => {
    // Mock return values from useGraph
    useGraph.mockReturnValue({
      chart: { value: {} },
      selectedNodes: { value: [] },
      deselectAllNodes: vi.fn(),
      error: null,
    });

    // Mount the component
    const wrapper = mount(HomeView, {
      components: { Toast },
      setup() {
        const { chart, selectedNodes, deselectAllNodes, error } = useGraph('http://localhost:4000/api/data', vi.fn());

        const selectedNode = computed(() => selectedNodes.value[0]?.data);
        return { selectedNode, chart, deselectAllNodes, error };
      },
    });

    // Check if the graph div is rendered
    expect(wrapper.find('.graph').exists()).toBe(true);
  });

  it('renders the Toast component when a node is selected', () => {
    // Mock return values from useGraph with a selected node
    useGraph.mockReturnValue({
      chart: { value: {} },
      selectedNodes: { value: [{ data: { name: 'Node A' } }] },
      deselectAllNodes: vi.fn(),
      error: null,
    });

    // Mount the component
    const wrapper = mount({
        template: `
        <section>
          <Toast v-if="selectedNode" :data="selectedNode" :callback="deselectAllNodes" />
          <div class="graph" ref="chart"></div>
          <div v-if="error" class="error">{{ error }}</div>
        </section>
      `,
      components: { Toast },
      setup() {
        const { chart, selectedNodes, deselectAllNodes, error } = useGraph('http://localhost:4000/api/data', vi.fn());

        const selectedNode = computed(() => selectedNodes.value[0]?.data);
        return { selectedNode, chart, deselectAllNodes, error };
      },
    });

    // Check if the Toast component is rendered with the correct data
    expect(wrapper.findComponent(Toast).exists()).toBe(true);
    expect(wrapper.findComponent(Toast).props('data')).toEqual({ name: 'Node A' });
  });

  it('renders the error message when an error occurs', () => {
    // Mock return values from useGraph with an error
    useGraph.mockReturnValue({
      chart: { value: {} },
      selectedNodes: { value: [] },
      deselectAllNodes: vi.fn(),
      error: 'An error occurred',
    });

    // Mount the component
    const wrapper = mount({
      template: `
        <section>
          <Toast v-if="selectedNode" :data="selectedNode" :callback="deselectAllNodes" />
          <div class="graph" ref="chart"></div>
          <div v-if="error" class="error">{{ error }}</div>
        </section>
      `,
      components: { Toast },
      setup() {
        const { chart, selectedNodes, deselectAllNodes, error } = useGraph('http://localhost:4000/api/data', vi.fn());

        const selectedNode = computed(() => selectedNodes.value[0]?.data);
        return { selectedNode, chart, deselectAllNodes, error };
      },
    });

    // Check if the error message is rendered
    expect(wrapper.find('div.error').text()).toContain('An error occurred');
  });
});
