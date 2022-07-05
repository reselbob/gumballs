import {Gumball} from './resources/Gumball';
import {logger} from './logger';
import {AxiosStatic} from 'axios';

export const createActivities = (wc: AxiosStatic) => ({
  async buy(url: string): Promise<Array<Gumball>> {
    logger.info(`Getting Gumballs from ${url}`);
    const response = await wc.get(url);
    return response.data as Array<Gumball>;
  },
});
