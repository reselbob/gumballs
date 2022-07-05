import {Gumball} from './Gumball';
import {logger} from '../logger';
import axios from 'axios';

export class GumballBuyer {
  public async buy(numberToBuy: number): Promise<Array<Gumball>> {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    logger.info('getting gumballs');
    const cnt = numberToBuy || 10;
    const url = `http://0.0.0.0:5023/gumballs/${cnt}`;
    const rslt = await axios
      .get(url)
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(err => console.log(err));
    return Object.assign([], rslt);
  }
}
