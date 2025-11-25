export const providers = ['github', null, ''] as const;
export type ProvidersTypes = (typeof providers)[number];

export const config = (provider: ProvidersTypes) => ({
	client: {
		id: client[provider].id,
		secret: client[provider].secret
	},
	auth: {
		tokenHost: auth[provider].tokenHost,
		tokenPath: auth[provider].tokenPath,
		authorizePath: auth[provider].authorizePath
	}
});

const client = {
	github: {
		id: process.env.OAUTH_GITHUB_CLIENT_ID,
		secret: process.env.OAUTH_GITHUB_CLIENT_SECRET
	}
};

const auth = {
	github: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize'
	}
};
