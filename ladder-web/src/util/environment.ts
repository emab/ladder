interface Auth0Environment {
  clientId: string;
  domain: string;
  audience: string;
}

export const getAuth0Environment = (): Auth0Environment => ({
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID!,
  domain: process.env.REACT_APP_AUTH0_DOMAIN!,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
});
