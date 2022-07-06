import {Gumball} from './resources/Gumball';
import {logger} from './logger';
import axios from 'axios';

export const createActivities = () => ({
  async buy(supplierURL: string, quantity: number): Promise<Array<Gumball>> {
    const url = `${supplierURL}/${quantity}`;
    const result = await axios
      .get(url)
      .then(response => {
        logger.info(response);
        return response.data;
      })
      .catch(err => logger.error(err));
    return Object.assign([], result);
  },
});
