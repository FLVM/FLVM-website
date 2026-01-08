# FLVM site web

Code source du site web de cours de cuisines et de pâtisseries Faites-le vous-même.

Le cahier des charges est le suivant :

- respecter l'approche [JAMSSTACK](https://jamstack.org/)
- grande performance d'affichage
- empreinte énergétique faible
- maintenance simplifié
- édition de contenu simplifier
- permettre l'affichage d'un planning de cours
- faciliter l'inscription aux cours

## Technologies

Les technologies ont été choisies pour offrir le meilleur rapport performances / simplicité d'usage.

- Framework client & serveur : [Svelte](https://svelte.dev/)
- Framework design & composants graphiques : [Skeleton](https://www.skeleton.dev/)
- Gestionnaire de contenu : [Svletia CMS](https://github.com/sveltia/sveltia-cms)
- Hébergement : [Vercel](https://vercel.com)

## Authentification CMS

L'authenffication necessite un serveur proxy https://decapcms.org/docs/backends-overview/

### Github et Netlify

La condition est que la production soit publié sur Netlify.

Configurer [une application OAuth sur Github](https://github.com/settings/applications/new). L'url de callback doit être `<domain>/auth/done`.

Sur le projet Netlify, configurer un fournisseur d'authenfication ; projet > Project configuration > OAuth > Install Provider, choisir Github et renseigner le ClientId et le Client Secret fourni lors de la création de l'AOuth Github.

Documentation Netlify : https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/

### Github et Vercel

Pour une authentifier un projet hébergé sur Vercel, il est nécessaire de mettre en œuvre sont propre proxy.

Configurer [une application OAuth sur Github](https://github.com/settings/applications/new). L'URL du callback doitn en prendre en compte les attentes du proxy (`/callback` ou `/api/callback` par exemple).

Ajouter un proxy :

- Un proxy worker sur Cloudflare : https://github.com/sterlingwes/decap-proxy
- Proxy maison : écrire un endpoint `auth` et un endpoint `callback`

## Proxy maison

Étape d'authentification de Sveltia lors du login :

1. pointer `api/auth`
2. `api/auth` génère une clef unique, la stocke en cookie et l'envoie à `https://github.com/login/oauth/authorize` avec le ClientId de Github et l'url de redirection `api/auth/done`.
3. Github contôle l'existence d'un App OAuth correspondant à la redirection `api/auth/done` et demande à l'utilisateur de s'authentifier avec sont compte Github.
4. Une fois authentifié, Gtihub généère un cookie d'authentification et appel la redirection `api/auth/done`
5. `api/auth/done` récupère le cookie d'authenfication de Github et réclame le token d'authentification à Github `https://github.com/login/oauth/access_token` en fournissant le ClientId et le ClientSecret et attend un token d'acces.
6. Une fois le token d'accès récupérer, l'envoyer à Sveltia via `window.opener.postMessage({ token: <token> })`

## Gestion d'utilisateur

Sur le compte de l'[organisation FLVM de Github](https://github.com/FLVM), depuis un compte propriétaire, aller sur l'onglet "People", puis cliquer sur "Invite member".

Saisir l'adresse email, puis valider.

Choisir le rôle "Member", choisir une éventuelle équipe, puis valider.

L'utilisateur doit accepter l'invitation depuis sa boite email et suivre la procédure de création de compte.

Une fois fait, l'utilisateur peut participer [aux discussions sur le projet](https://github.com/FLVM/FLVM-website/issues) et se connecter à [l'interface d'administration du site](https://flvm.fr/admin/index.html) via son compte Github.

## Mise à jour des dépendances

Constater les mises à jour avec la commande `yarn outdated`.

Mise à jour en respectant les versions sémantiques `yarn upgrade`.

Forecer la mise à jour sans respecter les versions sémantiques `yarn upgrade --latest` ou en commande interactive `yarn upgrade-interactive --latest`.
