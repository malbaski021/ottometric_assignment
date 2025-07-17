const ALLOWED_ENVS = ['qa', 'prod'] as const;
const ALLOWED_URLS = ['ottoviz.ominf.net'] as const;

export type Env = typeof ALLOWED_ENVS[number];
export type SiteUrl = typeof ALLOWED_URLS[number];

export type RuntimeConfig = {
  environment: Env;
  url: string;
};

export function getRuntimeConfig(): RuntimeConfig {
  const environment = (process.env.ENV ?? 'qa') as Env;
  const url = (process.env.URL ?? 'ottoviz.ominf.net') as SiteUrl;

  if (!ALLOWED_ENVS.includes(environment)) {
    throw new Error(`❌ Invalid ENV: '${environment}'. Allowed values: ${ALLOWED_ENVS.join(', ')}`);
  }

  if (!ALLOWED_URLS.includes(url)) {
    throw new Error(`❌ Invalid URL: '${url}'. Allowed values: ${ALLOWED_URLS.join(', ')}`);
  }

  // Build the full URL based on environment
  let subdomain = environment === 'qa' ? 'qa-' : 'www.';
  const fullUrl = `https://${subdomain}${url}`;

  return { environment, url: fullUrl };
}

/**
 * Returns the selected environment value ('qa' or 'prod').
 */
export function getEnv(): Env {
  const environment = (process.env.ENV ?? 'qa') as Env;
  if (!ALLOWED_ENVS.includes(environment)) {
    throw new Error(`❌ Invalid ENV: '${environment}'. Allowed: ${ALLOWED_ENVS.join(', ')}`);
  }
  return environment;
}

/**
 * Returns the selected site URL value ('ottoviz.ominf.net').
 */
export function getUrl(): SiteUrl {
  const url = (process.env.URL ?? 'ottoviz.ominf.net') as SiteUrl;
  if (!ALLOWED_URLS.includes(url)) {
    throw new Error(`❌ Invalid URL: '${url}'. Allowed: ${ALLOWED_URLS.join(', ')}`);
  }
  return url;
}
