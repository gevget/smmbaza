export const siteConfig = {
  SITE_URL: 'https://gevget.github.io/smmbaza/',
  VK_AUTH_URL: '',
  DEMO_FORM_ENDPOINT: '',
  PRIVACY_URL: '',
  TERMS_URL: '',
  MARKET_URL: '',
  ANALYTICS_ID: '',
  PARTNERSHIP_COPY: '',
  DEMO_MODE: true,
  OG_IMAGE_URL: 'https://gevget.github.io/smmbaza/public/media/optimized/smmbaza-og-cover.jpg',
};

export const isConfiguredUrl = (value) => typeof value === 'string' && value.trim().length > 0;
