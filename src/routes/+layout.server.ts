import { editor, type Editor, home, type Home, type Link } from '$lib/server/data';

const maintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

export type Links = Link[];

export function load(): {
	maintenance: boolean;
	editor: Editor;
	home: Home;
	links: Links;
	navigation: Links;
} {
	return {
		maintenance,
		editor,
		home,
		links: [
			{
				url: '/planning',
				text: 'Planning & réservation',
				color: 'tertiary-950-50'
			},
			{
				url: '/les-cours',
				text: 'Les cours'
			},
			{
				url: '/tarifs',
				text: 'Tarifs'
			}
		],
		navigation: [
			{
				url: '/',
				text: 'Accueil'
			},
			{
				url: '/planning',
				text: 'Planning & réservation'
			},
			{
				url: '/les-cours',
				text: 'Les cours'
			},
			{
				url: '/tarifs',
				text: 'Tarifs & modalités'
			},
			{
				url: '/a-propos',
				text: 'À propos'
			},
			{
				url: '/legals/mentions-legales',
				text: 'Mentions légales'
			},
			{
				url: '/styleguide',
				text: 'Guide de style'
			}
		]
	};
}
