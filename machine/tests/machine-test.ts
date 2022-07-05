import {expect} from 'chai';
import {before, describe, it} from 'mocha';
import {logger} from '../src/logger';

describe('Machine Test', () => {
  before(async () => {
    // tslint:disable-next-line:no-console
    logger.info('starting machine Test');
  });

  after(async () => {
    // tslint:disable-next-line:no-console
    logger.info('finished machine Test');
  });

  it('Can GET NOTHING', async () => {
    expect(1).to.eq(1);
  });
});
