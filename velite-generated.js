// Velite file generated from `./lib/sveltia-to-velite.ts`

import { s } from 'velite';
export const AddressSchema = s.object({
  name: s.string().nullable(),
  street: s.string().nullable(),
  zipcode: s.string(),
  city: s.string(),
  country: s.string()
});
export const address = {
  name: 'Address',
  pattern: 'schema/**/*.md',
  single: false,
  schema: AddressSchema
};

export const ImageSchema = s.object({
  src: s.string(),
  alt: s.string(),
  legend: s.markdown().nullable()
});
export const image = {
  name: 'Image',
  pattern: 'schema/**/*.md',
  single: false,
  schema: ImageSchema
};

export const LinkSchema = s.object({
  text: s.string(),
  url: s.string(),
  color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
  icon_before: s
    .enum([
      '',
      'arrow-left',
      'arrow-right',
      'external-link',
      'facebook',
      'instagram',
      'twitter',
      'calendar',
      'cake',
      'cookie',
      'ice-cream-cone',
      'croissant',
      'cooking-pot',
      'chef-hat',
      'heart',
      'gift',
      'mail',
      'send',
      'star',
      'party-popper',
      'download'
    ])
    .nullable(),
  icon_after: s
    .enum([
      '',
      'arrow-left',
      'arrow-right',
      'external-link',
      'facebook',
      'instagram',
      'twitter',
      'calendar',
      'cake',
      'cookie',
      'ice-cream-cone',
      'croissant',
      'cooking-pot',
      'chef-hat',
      'heart',
      'gift',
      'mail',
      'send',
      'star',
      'party-popper',
      'download'
    ])
    .nullable(),
  icon_only: s.boolean().nullable()
});
export const link = { name: 'Link', pattern: 'schema/**/*.md', single: false, schema: LinkSchema };

export const CardSchema = s.object({
  id: s.string(),
  featured: s.boolean().nullable(),
  title: s.string().nullable(),
  content: s.markdown().nullable(),
  image: s.object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() }).nullable(),
  link: s
    .object({
      text: s.string(),
      url: s.string(),
      color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
      icon_before: s
        .enum([
          '',
          'arrow-left',
          'arrow-right',
          'external-link',
          'facebook',
          'instagram',
          'twitter',
          'calendar',
          'cake',
          'cookie',
          'ice-cream-cone',
          'croissant',
          'cooking-pot',
          'chef-hat',
          'heart',
          'gift',
          'mail',
          'send',
          'star',
          'party-popper',
          'download'
        ])
        .nullable(),
      icon_after: s
        .enum([
          '',
          'arrow-left',
          'arrow-right',
          'external-link',
          'facebook',
          'instagram',
          'twitter',
          'calendar',
          'cake',
          'cookie',
          'ice-cream-cone',
          'croissant',
          'cooking-pot',
          'chef-hat',
          'heart',
          'gift',
          'mail',
          'send',
          'star',
          'party-popper',
          'download'
        ])
        .nullable(),
      icon_only: s.boolean().nullable()
    })
    .nullable()
});
export const card = { name: 'Card', pattern: 'schema/**/*.md', single: false, schema: CardSchema };

export const CoverSchema = s.object({
  overhead: s.string().nullable(),
  title: s.string(),
  text: s.markdown(),
  image: s.object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() }).nullable(),
  link: s
    .object({
      text: s.string(),
      url: s.string(),
      color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
      icon_before: s
        .enum([
          '',
          'arrow-left',
          'arrow-right',
          'external-link',
          'facebook',
          'instagram',
          'twitter',
          'calendar',
          'cake',
          'cookie',
          'ice-cream-cone',
          'croissant',
          'cooking-pot',
          'chef-hat',
          'heart',
          'gift',
          'mail',
          'send',
          'star',
          'party-popper',
          'download'
        ])
        .nullable(),
      icon_after: s
        .enum([
          '',
          'arrow-left',
          'arrow-right',
          'external-link',
          'facebook',
          'instagram',
          'twitter',
          'calendar',
          'cake',
          'cookie',
          'ice-cream-cone',
          'croissant',
          'cooking-pot',
          'chef-hat',
          'heart',
          'gift',
          'mail',
          'send',
          'star',
          'party-popper',
          'download'
        ])
        .nullable(),
      icon_only: s.boolean().nullable()
    })
    .nullable()
});
export const cover = {
  name: 'Cover',
  pattern: 'schema/**/*.md',
  single: false,
  schema: CoverSchema
};

import path from 'path';
export const TeamSchema = s
  .object({
    publish: s.boolean(),
    firstname: s.string(),
    lastname: s.string(),
    title: s.string().nullable(),
    description: s.string().nullable(),
    email: s.string().nullable(),
    phone: s.string().nullable(),
    slug: s.path()
  })
  .transform((data, { meta }) => {
    return {
      ...data,
      filename: path.basename(meta.path),
      name: `${data.firstname} ${data.lastname}`
    };
  });
export const team = { name: 'Team', pattern: 'team/**/*.md', single: false, schema: TeamSchema };

export const PlacesSchema = s.object({
  publish: s.boolean(),
  name: s.string(),
  image: s.object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() }).nullable(),
  body: s.markdown().nullable(),
  address: s.object({
    name: s.string().nullable(),
    street: s.string().nullable(),
    zipcode: s.string(),
    city: s.string(),
    country: s.string()
  }),
  hours: s.markdown().nullable(),
  slug: s.path()
});
export const places = {
  name: 'Places',
  pattern: 'places/**/*.md',
  single: false,
  schema: PlacesSchema
};

export const HomeSchema = s.object({
  seo: s.object({ title: s.string(), description: s.string() }),
  cover: s.object({
    overhead: s.string().nullable(),
    title: s.string(),
    text: s.markdown(),
    image: s
      .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
      .nullable(),
    link: s
      .object({
        text: s.string(),
        url: s.string(),
        color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
        icon_before: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_after: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_only: s.boolean().nullable()
      })
      .nullable()
  }),
  cards: s
    .array(
      s.object({
        id: s.string(),
        featured: s.boolean().nullable(),
        title: s.string().nullable(),
        content: s.markdown().nullable(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  aside: s
    .array(
      s.object({
        id: s.string(),
        featured: s.boolean().nullable(),
        title: s.string().nullable(),
        content: s.markdown().nullable(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  posts: s
    .array(
      s.object({
        id: s.string(),
        featured: s.boolean().nullable(),
        title: s.string().nullable(),
        content: s.markdown().nullable(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  slug: s.path()
});
export const home = { name: 'Home', pattern: 'home.json', single: true, schema: HomeSchema };

export const CoursesSchema = s.object({
  seo: s.object({ title: s.string(), description: s.string() }),
  cover: s.object({
    overhead: s.string().nullable(),
    title: s.string(),
    text: s.markdown(),
    image: s
      .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
      .nullable(),
    link: s
      .object({
        text: s.string(),
        url: s.string(),
        color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
        icon_before: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_after: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_only: s.boolean().nullable()
      })
      .nullable()
  }),
  lessons: s
    .array(
      s.object({
        title: s.string(),
        id: s.string(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        description: s.markdown(),
        instructor: s.string(),
        place: s.string(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  cards: s
    .array(
      s.object({
        id: s.string(),
        featured: s.boolean().nullable(),
        title: s.string().nullable(),
        content: s.markdown().nullable(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  slug: s.path()
});
export const courses = {
  name: 'Courses',
  pattern: 'cours.json',
  single: true,
  schema: CoursesSchema
};

export const BookingSchema = s.object({
  seo: s.object({ title: s.string(), description: s.string() }),
  cover: s.object({
    overhead: s.string().nullable(),
    title: s.string(),
    text: s.markdown(),
    image: s
      .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
      .nullable(),
    link: s
      .object({
        text: s.string(),
        url: s.string(),
        color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
        icon_before: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_after: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_only: s.boolean().nullable()
      })
      .nullable()
  }),
  cards: s
    .array(
      s.object({
        id: s.string(),
        featured: s.boolean().nullable(),
        title: s.string().nullable(),
        content: s.markdown().nullable(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  slug: s.path()
});
export const booking = {
  name: 'Booking',
  pattern: 'booking.json',
  single: true,
  schema: BookingSchema
};

export const PricelistSchema = s.object({
  seo: s.object({ title: s.string(), description: s.string() }),
  cover: s.object({
    overhead: s.string().nullable(),
    title: s.string(),
    text: s.markdown(),
    image: s
      .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
      .nullable(),
    link: s
      .object({
        text: s.string(),
        url: s.string(),
        color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
        icon_before: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_after: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_only: s.boolean().nullable()
      })
      .nullable()
  }),
  prices: s
    .array(
      s.object({
        id: s.string(),
        name: s.string(),
        price: s.number().nullable(),
        detail: s.markdown().nullable()
      })
    )
    .nullable(),
  cards: s
    .array(
      s.object({
        id: s.string(),
        featured: s.boolean().nullable(),
        title: s.string().nullable(),
        content: s.markdown().nullable(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  slug: s.path()
});
export const pricelist = {
  name: 'Pricelist',
  pattern: 'pricelist.json',
  single: true,
  schema: PricelistSchema
};

export const AboutSchema = s.object({
  seo: s.object({ title: s.string(), description: s.string() }),
  cover: s.object({
    overhead: s.string().nullable(),
    title: s.string(),
    text: s.markdown(),
    image: s
      .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
      .nullable(),
    link: s
      .object({
        text: s.string(),
        url: s.string(),
        color: s.enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white']).nullable(),
        icon_before: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_after: s
          .enum([
            '',
            'arrow-left',
            'arrow-right',
            'external-link',
            'facebook',
            'instagram',
            'twitter',
            'calendar',
            'cake',
            'cookie',
            'ice-cream-cone',
            'croissant',
            'cooking-pot',
            'chef-hat',
            'heart',
            'gift',
            'mail',
            'send',
            'star',
            'party-popper',
            'download'
          ])
          .nullable(),
        icon_only: s.boolean().nullable()
      })
      .nullable()
  }),
  body: s.markdown().nullable(),
  cards: s
    .array(
      s.object({
        id: s.string(),
        featured: s.boolean().nullable(),
        title: s.string().nullable(),
        content: s.markdown().nullable(),
        image: s
          .object({ src: s.string(), alt: s.string(), legend: s.markdown().nullable() })
          .nullable(),
        link: s
          .object({
            text: s.string(),
            url: s.string(),
            color: s
              .enum(['', 'neutral', 'primary', 'secondary', 'dark', 'black', 'white'])
              .nullable(),
            icon_before: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_after: s
              .enum([
                '',
                'arrow-left',
                'arrow-right',
                'external-link',
                'facebook',
                'instagram',
                'twitter',
                'calendar',
                'cake',
                'cookie',
                'ice-cream-cone',
                'croissant',
                'cooking-pot',
                'chef-hat',
                'heart',
                'gift',
                'mail',
                'send',
                'star',
                'party-popper',
                'download'
              ])
              .nullable(),
            icon_only: s.boolean().nullable()
          })
          .nullable()
      })
    )
    .nullable(),
  slug: s.path()
});
export const about = { name: 'About', pattern: 'about.json', single: true, schema: AboutSchema };

export const EditorSchema = s.object({
  name: s.string(),
  baseline: s.string().nullable(),
  description: s.markdown(),
  contact: s.object({ name: s.string().nullable(), phone: s.string(), email: s.string() }),
  socials: s
    .array(
      s.object({
        text: s.string(),
        id: s.string(),
        icon: s.enum(['', 'facebook', 'twitter', 'instagram', 'vimeo']),
        url: s.string(),
        icon_only: s.boolean()
      })
    )
    .nullable(),
  address: s.object({
    name: s.string().nullable(),
    street: s.string().nullable(),
    zipcode: s.string(),
    city: s.string(),
    country: s.string()
  }),
  vcf_file: s.string().nullable(),
  slug: s.path()
});
export const editor = {
  name: 'Editor',
  pattern: 'settings/editor.json',
  single: true,
  schema: EditorSchema
};

export const LegalsSchema = s.object({
  seo: s.object({ title: s.string(), description: s.string() }),
  content: s.markdown().nullable(),
  slug: s.path()
});
export const legals = {
  name: 'Legals',
  pattern: 'legals.json',
  single: true,
  schema: LegalsSchema
};

export const collections = {
  address,
  image,
  link,
  card,
  cover,
  team,
  places,
  home,
  courses,
  booking,
  pricelist,
  about,
  editor,
  legals
};
