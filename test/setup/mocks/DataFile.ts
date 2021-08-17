import { AxiosResponse } from 'axios';
import { IJsonApiResponse } from '../../../src/Interfaces/jsonApiStructure/IJsonApiResponse'

const requestCollect: AxiosResponse<IJsonApiResponse> = {
  data: {
    data: [
      {
        type: 'posts',
        id: 1,
        attributes: {
          title: 'Suscipit ad voluptatum est aliquam omnis.',
        },
        links: { self: '/event-bus/posts/1' },
      },
      {
        type: 'posts',
        id: 2,
        attributes: {
          title: 'Suscipit ad voluptatum est aliquam omnis.',
        },
        links: { self: '/event-bus/posts/2' },
      },
      {
        type: 'posts',
        id: 3,
        attributes: {
          title: 'Suscipit ad voluptatum est aliquam omnis.',
        },
        links: { self: '/event-bus/posts/3' },
      }
    ],
    meta: {
      pagination: {
        total: 10,
        count: 3,
        per_page: 3,
        current_page: 1,
        total_pages: 4
      }
    },
    links: {
      self: 'http://127.0.0.1:8000/event-bus/posts?page%5Bsize%5D=3&page%5Bnumber%5D=1',
    }
  },
  status: 200,
  statusText: '',
  headers: {},
  config: {},
};

const requestOne: AxiosResponse<IJsonApiResponse> = {
  data: {
    data: {
      type: 'posts',
      id: 1,
      attributes: {
        title: 'Suscipit ad voluptatum est aliquam omnis.',
      },
      links: { self: '/event-bus/posts/1' }
    },
  },
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {}
};

export {
  requestOne,
  requestCollect,
}
