import { editor, type Editor, home, type Home, type Link } from "$lib/server/data"

export type Links = Link[]

export function load(): {
  editor: Editor,
  home: Home,
  links: Links,
  navigation: Links
} {
  return {
    editor,
    home,
    links: [
      {
        url: "/planning-et-reservation",
        text: "Planning & réservation",
        color: "tertiary-950-50"
      },
      {
        url: "/les-cours",
        text: "Les cours"
      },
      {
        url: "/tarifs-et-modalites",
        text: "Tarifs"
      }
    ],
    navigation: [
      {
        url: "/",
        text: "Acceuil"
      },
      {
        url: "/planning-et-reservation",
        text: "Planning & réservation"
      },
      {
        url: "/les-cours",
        text: "Les cours"
      },
      {
        url: "/tarifs-et-modalites",
        text: "Tarifs & modalités"
      },
      {
        url: "/a-propos",
        text: "À propos"
      },
      {
        url: "/legals/mentions-legales",
        text: "Mentions légales"
      },
      {
        url: "/styleguide",
        text: "Guide de style"
      }
    ]
  }
}