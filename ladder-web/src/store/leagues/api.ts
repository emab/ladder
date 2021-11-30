import { AuthenticatedRequest } from '../../api/authenticatedRequest';
import { endpoints } from '../../api/endpoints';
import { League } from '../../types';

export const getLeaguesRequest: AuthenticatedRequest<League[]> = (ajax) =>
  ajax.getJSON(endpoints.league.getLeagues);
