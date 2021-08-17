import _ from 'lodash';
import chai from 'chai';
import Handling from "../../src/ModelManagers/Handling";
import { requestOne, requestCollect } from '../setup/mocks/DataFile';
import Post from '../setup/Post';
import { HandlingFake } from '../setup//fakes/HandilingFake';
import { QueryModifierFake } from '../setup//fakes/QueryModifierFake';
import { QueryBuilderFake } from '../setup/fakes/QueryBuilderFake';

/** 
 *  Classa a ser testada
 * 
 *  @type {Post}
 */
let post = new Post(new QueryBuilderFake(), new QueryModifierFake(), new HandlingFake());

/** 
 *  Classa a ser testada
 * 
 *  @type {Handling}
 */
const handling = new Handling();

describe('Unit Tests - Handling', () => {
  beforeEach('Recria a classe Post', () => {
    post = new Post(new QueryBuilderFake(), new QueryModifierFake(), new HandlingFake());
  });

  describe('Respond', () => {
    it('respond without hydrate', () => {
      const result = handling.unserialize(requestOne.data);

      chai.expect(result).to.deep.equal({
        id: 1,
        type: 'posts',
        title: 'Suscipit ad voluptatum est aliquam omnis.',
      });
    });

    it('respond with hydrate', () => {
      const result = handling.hydrate(post, requestOne.data);

      chai.expect(result).to.be.an.instanceOf(Post)
      chai.expect(result).to.deep.includes({
        attributes: {
          id: 1,
          type:'posts',
          title:'Suscipit ad voluptatum est aliquam omnis.'
        },
        id: 1,
        relationships: {},
      });
    });

    it('respond collect without hydrate', () => {
      const result = handling.unserialize(requestCollect.data);

      chai.expect(result).to.deep.equal({
        '0':
          { id: 1,
            type: 'posts',
            title: 'Suscipit ad voluptatum est aliquam omnis.',
          },
        '1':
          { id: 2,
            type: 'posts',
            title: 'Suscipit ad voluptatum est aliquam omnis.',
          },
        '2':
          { id: 3,
            type: 'posts',
            title: 'Suscipit ad voluptatum est aliquam omnis.',
          }
      });
    });

    it('respond collect with hydrate', () => {
      const result = handling.hydrate(post, requestCollect.data);

      chai.expect(result[0]).to.be.an.instanceOf(Post)
      chai.expect(result[0]).to.be.an.all.keys('id', 'attributes', 'relationships', 'queryBuilder', 'queryModifier', 'handling')
      chai.expect(result[0]).to.deep.includes(
        {
          id: 1,
          attributes: {
            id: 1,
            type:'posts',
            title:'Suscipit ad voluptatum est aliquam omnis.'
          },
          relationships: {},
        },
      );
    });
  });

  describe('serialize', () => {
    it('serialize', () => {
      post.id = 1;
      post.attributes.slug = 'suscipit-ad-voluptatum-est-aliquam-omnis';
      post.attributes.title = 'Suscipit ad voluptatum est aliquam omnis.';
      post.attributes.subtitle = 'Suscipit ad voluptatum est aliquam omnis.';

      const result = handling.serialize(post);

      chai.expect(result).to.deep.equal(JSON.stringify({
        id: 1,
        type: 'posts',
        title: 'Suscipit ad voluptatum est aliquam omnis.',
        subtitle: 'Suscipit ad voluptatum est aliquam omnis.'
      }));
    });
  });
});