import { inferUserAgent } from '../../infer';

export default function({
  userAgent,
  electronVersion,
  platform,
}): Promise<string> {
  if (userAgent) {
    return userAgent;
  }

  return inferUserAgent(electronVersion, platform);
}
