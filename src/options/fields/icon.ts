import { inferIcon } from '../../infer';

import log = require('loglevel');

export async function icon({ icon, targetUrl, platform }): Promise<any> {
  // Icon is the path to the icon
  if (icon) {
    return Promise.resolve(icon);
  }

  try {
    return inferIcon(targetUrl, platform);
  } catch (error) {
    log.warn('Cannot automatically retrieve the app icon:', error);
    return null;
  }
}
