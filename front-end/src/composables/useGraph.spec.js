import { defineComponent } from 'vue';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import * as d3 from 'd3';

import { useGraph } from '../composables/useGraph';

const api = 'http://localhost:4000/api/data'
global.fetch = vi.fn();
const emit = vi.fn();
const TestComponent = defineComponent({
    setup() {
        return useGraph(api, emit);
    },
    template: '<div></div>'
})

const mockData = [
    { name: 'A', description: 'Description A', parent: '' },
    { name: 'B', description: 'Description B', parent: 'A' },
];

// Mock d3 library
vi.mock('d3', () => {
    const selectMock = vi.fn(() => ({
        append: vi.fn().mockReturnThis(),
        attr: vi.fn().mockReturnThis(),
        style: vi.fn().mockReturnThis(),
        data: vi.fn().mockReturnThis(),
        enter: vi.fn().mockReturnThis(),
        append: vi.fn().mockReturnThis(),
        on: vi.fn().mockReturnValue(vi.fn()),
        select: vi.fn().mockReturnThis(),
        text: vi.fn().mockReturnThis(),
    }));
    return {
        select: selectMock,
        selectAll: selectMock,
        hierarchy: vi.fn(),
        tree: vi.fn(() => ({
            size: vi.fn().mockReturnValue(vi.fn())
        })),
        linkHorizontal: vi.fn(() => ({
            x: vi.fn().mockReturnThis(),
            y: vi.fn().mockReturnThis(),
        })),
    };
});

describe('useGraph composable', () => {

    afterEach(() => {
        fetch.mockReset()
    });

    it('fetches data and initializes the graph', async () => {
        fetch.mockResolvedValue({
            json: () => mockData,
            ok: true
        });
        const wrapper = mount(TestComponent);
        
        await new Promise((resolve) => setTimeout(resolve, 0));
        const { selectedNodes, deselectAllNodes, error } = wrapper.vm;

        expect(fetch).toHaveBeenCalledWith(api);
        expect(error).toBe(null);
        expect(selectedNodes).toEqual([]);
    });

      it('handles fetch errors gracefully', async () => {
        fetch.mockResolvedValue({
            json: () => null,
            ok: false
        });
        const wrapper = mount(TestComponent);
        await new Promise((resolve) => setTimeout(resolve, 0));
        const { error } = wrapper.vm;
        expect(error).toBe('Network response was not ok');
      });

      it('handles node selection and deselection', async () => {
        fetch.mockResolvedValue({
            json: () => mockData,
            ok: true
        });
        const wrapper = mount(TestComponent);
        await new Promise((resolve) => setTimeout(resolve, 0));
        let { selectedNodes, deselectAllNodes } = wrapper.vm;
        const nodeData = { data: { name: 'Node A' }, element: {} };

        selectedNodes.push(nodeData);
        deselectAllNodes();
        selectedNodes = wrapper.vm.selectedNodes;
        expect(selectedNodes).toEqual([]);
      });

      it('correctly processes the fetched data into a hierarchy', async () => {
        fetch.mockResolvedValue({
            json: () => mockData,
            ok: true
        });
        mount(TestComponent);
        await new Promise((resolve) => setTimeout(resolve, 0));
        
        expect(d3.hierarchy).toHaveBeenCalledWith({
          name: 'A',
          description: 'Description A',
          parent: '',
          children: [
            { name: 'B', description: 'Description B', parent: 'A', children: [] },
          ],
        });
      });
});
