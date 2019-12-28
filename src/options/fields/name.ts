import { sanitizeFilename } from '../../utils';
import { inferTitle } from '../../infer';
import { DEFAULT_APP_NAME } from '../../constants';

import log = require('loglevel');

async function tryToInferName({ name, targetUrl }): Promise<string> {
  // .length also checks if its the commanderJS function or a string
  if (name && name.length > 0) {
    return Promise.resolve(name);
  }

  try {
    const pageTitle = await inferTitle(targetUrl);
    return pageTitle || DEFAULT_APP_NAME;
  } catch (error) {
    log.warn(
      `Unable to automatically determine app name, falling back to '${DEFAULT_APP_NAME}'. Reason: ${error}`,
    );
    return DEFAULT_APP_NAME;
  }
}

export default async function({ platform, name, targetUrl }): Promise<string> {
  const inferredName = await tryToInferName({ name, targetUrl });
  return sanitizeFilename(platform, inferredName);
}
