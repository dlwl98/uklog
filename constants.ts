export const COOKIE_KEY = {
  TOKEN: 'token',
  LOGGED_IN: 'loggedIn',
} as const;

type AUTH_REQUIRE_PATH = (typeof AUTH_REQUIRE_PATHS)[number];
export const AUTH_REQUIRE_PATHS = [
  '/write',
  '/posts/:id/edit',
  '/posts/:id/private',
  '/api/posts/:id',
  '/api/revalidate',
] as const;

export const PATH_REGEXP_MAP: {
  [key in AUTH_REQUIRE_PATH]: RegExp;
} = {
  '/write': /\/write/,
  '/posts/:id/edit': /\/posts\/[^\/]+\/edit$/,
  '/posts/:id/private': /\/posts\/[^\/]+\/private$/,
  '/api/posts/:id': /\/api\/posts\/[^\/]+$/,
  '/api/revalidate': /\/api\/revalidate/,
} as const;

export const AUTH_REQUIRE_PATH_MAP: {
  [key in AUTH_REQUIRE_PATH]: {
    method: string;
    redirect: boolean;
  };
} = {
  '/write': {
    method: 'GET',
    redirect: true,
  },
  '/posts/:id/edit': {
    method: 'GET',
    redirect: true,
  },
  '/posts/:id/private': {
    method: 'GET',
    redirect: true,
  },
  '/api/posts/:id': {
    method: 'DELETE',
    redirect: false,
  },
  '/api/revalidate': {
    method: 'GET',
    redirect: false,
  },
};
