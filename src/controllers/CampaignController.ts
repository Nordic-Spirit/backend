import { Request, Response } from 'express';
import { controller, get } from './decorators';
import { CampaignRepo } from '../repos';

@controller('/campaigns')
class CampaignController {
  static campaignRepo = new CampaignRepo();

  @get('/')
  getActiveCampaigns() {}
}
