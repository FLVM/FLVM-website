// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/**
 * Définition des métadonnées
 *
 * https://www.searchenginejournal.com/important-tags-seo/156440/
 * Essentials Meta we need :
 *  - title (titre unique de description de 50-60 signes)
 *  - description (résumé de la page en 150-160 signes)
 *  - robot (ne pas indexer les micro contenu et contenus non pertinents)
 *  - canonical (unifier les url avec de multiples paramètres qui n'impacte pas le contenu sous la même url)
 *  - lang : https://svelte.dev/docs/kit/accessibility#The-lang-attribute
 *  - author
 * - social : title, url, description, image
 *   https://developers.facebook.com/tools/debug/
 *   https://cards-dev.twitter.com/validator
 * - Schema JSON-LD https://json-ld.org/ (permet de marquer les personnes, les lieux, les évenements, etc)
 *   Également, pour améliorer le SEO, ajouter des marquages Schema : https://www.searchenginejournal.com/technical-seo/schema/
 */

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  robot?: string;
  author?: string;
  social?: {
    title: string;
    type: 'website' | 'article' | 'product';
    url: string;
    site_name?: string;
    image?: string;
    description?: string;
    locale?: string;
  };
}
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      meta: PageMetadata;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
