import _ from 'lodash';
import chai from 'chai';
import Post from '../setup/Post';
import { QueryBuilder } from '../../src';
import { QueryModifier } from '../../src';
import Handling from "../../src/ModelManagers/Handling";

let post: Post = new Post(new QueryBuilder(), new QueryModifier(), new Handling());

describe('Integration Tests - Model', () => {
  beforeEach('Recria a classe Post', () => {
    post = new Post(new QueryBuilder(), new QueryModifier(), new Handling());
  });

  it('Listagem de Posts com include de Authores e Filtros por Posts Ativos, trazendo como entidades.', async () => {
    const result = await post.with('author').select('title').orderByAsc('id').where('active', 'true').all().getEntity();

    chai.expect(result).to.deep.equal([
      {
        attributes: {
          id: 1,
          type: 'posts',
          title: 'Suscipit ad voluptatum est aliquam omnis.'
        },
        relationships: {},
        queryBuilder: {
          _query: '',
          _includes: [],
          _sort: [],
          _filters: [],
          _fields: [],
          _pagination: {
            number: NaN,
            size: NaN
          }
        },
        queryModifier: {},
        handling: {},
        _config: {
          method: 'GET',
          url: 'http://localhost/event-bus/posts?include=author&fields%5Bposts%5D=title&filter%5Bactive%5D=true&sort=id',
          data: undefined,
          headers: undefined
        },
        id: 1
      },
      {
        attributes: {
          id: 2,
          type: 'posts',
          title: 'Suscipit ad voluptatum est aliquam omnis.'
        },
        relationships: {},
        queryBuilder: {
          _query: '',
          _includes: [],
          _sort: [],
          _filters: [],
          _fields: [],
          _pagination: {
            number: NaN,
            size: NaN
          }
        },
        queryModifier: {},
        handling: {},
        _config: {
          method: 'GET',
          url: 'http://localhost/event-bus/posts?include=author&fields%5Bposts%5D=title&filter%5Bactive%5D=true&sort=id',
          data: undefined,
          headers: undefined
        },
        id: 2
      },
      {
        attributes: {
          id: 3,
          type: 'posts',
          title: 'Suscipit ad voluptatum est aliquam omnis.'
        },
        relationships: {},
        queryBuilder: {
          _query: '',
          _includes: [],
          _sort: [],
          _filters: [],
          _fields: [],
          _pagination: {
            number: NaN,
            size: NaN
          }
        },
        queryModifier: {},
        handling: {},
        _config: {
          method: 'GET',
          url: 'http://localhost/event-bus/posts?include=author&fields%5Bposts%5D=title&filter%5Bactive%5D=true&sort=id',
          data: undefined,
          headers: undefined
        },
        id: 3
      }
    ]);
  });

  it('Procura por um Post com ID 5, sendo Filtrado por Ativo e Ordenado por ID decrescente.', async () => {
    const result = await post.where('active', 'true').orderByDesc('id').find(5).getEntity() as Post;

    chai.expect(result).to.deep.equal({
      attributes: {
        id: 1,
        type: 'posts',
        title: 'Suscipit ad voluptatum est aliquam omnis.'
      },
      relationships: {},
      queryBuilder: {
        _query: '',
        _includes: [],
        _sort: [],
        _filters: [],
        _fields: [],
        _pagination: { number: NaN, size: NaN }
      },
      queryModifier: {},
      handling: {},
      _config: {
        method: 'GET',
        url: 'http://localhost/event-bus/posts/5?filter%5Bactive%5D=true&sort=-id',
        data: undefined,
        headers: undefined
      },
      id: 1
    });
  });

  it('Salvar Um Post (Criação)', async () => {
    post.attributes.title = 'Meu Post';
    post.attributes.subtitle = 'Meu Subtitle';

    const result = await post.save().getEntity();

    chai.expect(result).to.deep.equal({
      attributes: {
        id: 1,
        type: 'posts',
        title: 'Suscipit ad voluptatum est aliquam omnis.',
        subtitle: 'Meu Subtitle',
      },
      relationships: {},
      queryBuilder: {
        _query: '',
        _includes: [],
        _sort: [],
        _filters: [],
        _fields: [],
        _pagination: { number: NaN, size: NaN }
      },
      queryModifier: {},
      handling: {},
      _config: {
        method: 'POST',
        url: 'http://localhost/event-bus/posts',
        data: '{"type":"posts","title":"Meu Post","subtitle":"Meu Subtitle"}',
        headers: undefined
      },
      id: 1
    });
  });

  it('Salvar Um Post (Edição)', async () => {
    post = await post.find(1).getEntity() as Post;

    chai.expect(post).to.deep.equal({
      attributes: {
        id: 1,
        type: 'posts',
        title: 'Suscipit ad voluptatum est aliquam omnis.',
      },
      relationships: {},
      queryBuilder: {
        _query: '',
        _includes: [],
        _sort: [],
        _filters: [],
        _fields: [],
        _pagination: { number: NaN, size: NaN }
      },
      queryModifier: {},
      handling: {},
      _config: {
        method: 'GET',
        url: 'http://localhost/event-bus/posts/1',
        data: undefined,
        headers: undefined
      },
      id: 1
    });

    post.attributes.title = 'Meu Post';
    post.attributes.subtitle = 'Meu Subtitle';

    const result = post.save();

    chai.expect(result).to.deep.equal({
      attributes: {
        id: 1,
        type: 'posts',
        title: 'Meu Post',
        subtitle: 'Meu Subtitle',
      },
      relationships: {},
      queryBuilder: {
        _query: '',
        _includes: [],
        _sort: [],
        _filters: [],
        _fields: [],
        _pagination: { number: NaN, size: NaN }
      },
      queryModifier: {},
      handling: {},
      _config: {
        method: 'PUT',
        url: 'http://localhost/event-bus/posts/1',
        data: '{"id":1,"type":"posts","title":"Meu Post","subtitle":"Meu Subtitle"}',
        headers: undefined
      },
      id: 1
    });
  });

  it('Criação de um Post', async () => {
    post.attributes.title = 'Meu Post';
    post.attributes.subtitle = 'Meu Subtitle';

    const result = await post.create().getEntity();

    chai.expect(result).to.deep.equal({
      attributes: {
        id: 1,
        type: 'posts',
        title: 'Suscipit ad voluptatum est aliquam omnis.',
        subtitle: 'Meu Subtitle',
      },
      relationships: {},
      queryBuilder: {
        _query: '',
        _includes: [],
        _sort: [],
        _filters: [],
        _fields: [],
        _pagination: { number: NaN, size: NaN }
      },
      queryModifier: {},
      handling: {},
      _config: {
        method: 'POST',
        url: 'http://localhost/event-bus/posts',
        data: '{"type":"posts","title":"Meu Post","subtitle":"Meu Subtitle"}',
        headers: undefined
      },
      id: 1
    });
  });

  it('Edição', async () => {
    post.attributes.subtitle = 'Meu Subtitle';

    const result = await post.update(1).getEntity();

    chai.expect(result).to.deep.equal({
      attributes: {
        id: 1,
        type: 'posts',
        title: 'Suscipit ad voluptatum est aliquam omnis.',
        subtitle: 'Meu Subtitle',
      },
      relationships: {},
      queryBuilder: {
        _query: '',
        _includes: [],
        _sort: [],
        _filters: [],
        _fields: [],
        _pagination: { number: NaN, size: NaN }
      },
      queryModifier: {},
      handling: {},
      _config: {
        method: 'PUT',
        url: 'http://localhost/event-bus/posts/1',
        data: '{"id":1,"type":"posts","subtitle":"Meu Subtitle"}',
        headers: undefined
      },
      id: 1
    });
  });
});