import { inferUserAgent } from '../../infer';

type UserAgentOpts = {
  userAgent?: string;
  electronVersion?: string;
  platform?: string;
};
export default async function({
  userAgent,
  electronVersion,
  platform,
}: UserAgentOpts): Promise<string> {
  if (userAgent) {
    return userAgent;
  }

  return inferUserAgent(electronVersion, platform);
}
