// Velite file generated from `./lib/sveltia-to-velite.ts`


import { s } from 'velite'
export const ImageSchema = s.object({
 src: s.string(),
 alt: s.string(),
 legend: s.markdown().optional().nullable()
})
export const image = { name: "Image", pattern: "schema/**/*.md", single: false, schema: ImageSchema}

export const LinkSchema = s.object({
 text: s.string(),
 url: s.string(),
 color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),
 icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),
 icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),
 icon_only: s.boolean().optional().nullable()
})
export const link = { name: "Link", pattern: "schema/**/*.md", single: false, schema: LinkSchema}

export const CardSchema = s.object({
 featured: s.boolean().optional().nullable(),
 title: s.string().optional().nullable(),
 content: s.markdown().optional().nullable(),
 image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),
 link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()
})
export const card = { name: "Card", pattern: "schema/**/*.md", single: false, schema: CardSchema}

import path from "path"
export const TeamSchema = s.object({
 publish: s.boolean(),
 firstname: s.string(),
 lastname: s.string(),
 title: s.string().optional().nullable(),
 description: s.string().optional().nullable(),
 email: s.string().optional().nullable(),
 phone: s.string().optional().nullable(),
 slug: s.path()
}).transform((data, { meta }) => {
      return {
        ...data,
        filename: path.basename(meta.path),
        name: `${data.firstname} ${data.lastname}`
      }
    })
export const team = { name: "Team", pattern: "team/**/*.md", single: false, schema: TeamSchema}

export const PlacesSchema = s.object({
 publish: s.boolean(),
 name: s.string(),
 image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),
 content: s.markdown().optional().nullable(),
 address: s.object({name: s.string().optional().nullable(),street: s.string().optional().nullable(),zipcode: s.string(),city: s.string(),country: s.string()}),
 hours: s.markdown().optional().nullable(),
 slug: s.path()
})
export const places = { name: "Places", pattern: "places/**/*.md", single: false, schema: PlacesSchema}

export const HomeSchema = s.object({
 seo: s.object({title: s.string(),description: s.string()}),
 cover: s.object({overhead: s.string().optional().nullable(),title: s.string().optional().nullable(),text: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()}),
 cards: s.array(s.object({featured: s.boolean().optional().nullable(),title: s.string().optional().nullable(),content: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})),
 aside: s.array(s.object({featured: s.boolean().optional().nullable(),title: s.string().optional().nullable(),content: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})),
 posts: s.array(s.object({featured: s.boolean().optional().nullable(),title: s.string().optional().nullable(),content: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})),
 slug: s.path()
})
export const home = { name: "Home", pattern: "settings/home.json", single: true, schema: HomeSchema}

export const CoursesSchema = s.object({
 seo: s.object({title: s.string(),description: s.string()}),
 content: s.markdown(),
 lessons: s.array(s.object({title: s.string(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),description: s.markdown(),instructor: s.string(),place: s.string(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})).optional().nullable(),
 cards: s.array(s.object({featured: s.boolean().optional().nullable(),title: s.string().optional().nullable(),content: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})),
 slug: s.path()
})
export const courses = { name: "Courses", pattern: "cours.md", single: true, schema: CoursesSchema}

export const BookingSchema = s.object({
 seo: s.object({title: s.string(),description: s.string()}),
 content: s.markdown(),
 cards: s.array(s.object({featured: s.boolean().optional().nullable(),title: s.string().optional().nullable(),content: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})),
 slug: s.path()
})
export const booking = { name: "Booking", pattern: "booking.md", single: true, schema: BookingSchema}

export const PricelistSchema = s.object({
 seo: s.object({title: s.string(),description: s.string()}),
 content: s.markdown(),
 prices: s.array(s.object({name: s.string(),price: s.number().optional().nullable(),detail: s.markdown().optional().nullable()})).optional().nullable(),
 cards: s.array(s.object({featured: s.boolean().optional().nullable(),title: s.string().optional().nullable(),content: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})),
 slug: s.path()
})
export const pricelist = { name: "Pricelist", pattern: "pricelist.md", single: true, schema: PricelistSchema}

export const AboutSchema = s.object({
 seo: s.object({title: s.string(),description: s.string()}),
 content: s.markdown(),
 cards: s.array(s.object({featured: s.boolean().optional().nullable(),title: s.string().optional().nullable(),content: s.markdown().optional().nullable(),image: s.object({src: s.string(),alt: s.string(),legend: s.markdown().optional().nullable()}).optional().nullable(),link: s.object({text: s.string(),url: s.string(),color: s.enum(["", "","primary-500","secondary-500","tertiary-950-50","surface-950-50","surface-50-950"]).optional().nullable(),icon_before: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_after: s.enum(["", "arrow-left","arrow-right","external-link","facebook","instagram","twitter","calendar","cake","cookie","ice-cream-cone","croissant","cooking-pot","chef-hat","heart","gift","mail","send","star","party-popper"]).optional().nullable(),icon_only: s.boolean().optional().nullable()}).optional().nullable()})),
 slug: s.path()
})
export const about = { name: "About", pattern: "about.md", single: true, schema: AboutSchema}

export const ConfigurationSchema = s.object({
 footer: s.object({colophon: s.string(),links: s.string()}),
 slug: s.path()
})
export const configuration = { name: "Configuration", pattern: "settings/main.json", single: true, schema: ConfigurationSchema}

export const EditorSchema = s.object({
 name: s.string(),
 baseline: s.string().optional().nullable(),
 description: s.markdown(),
 contact: s.object({name: s.string().optional().nullable(),phone: s.string(),email: s.string()}),
 socials: s.array(s.object({text: s.string(),icon: s.enum(["", "facebook","twitter","instagram","vimeo"]),url: s.string(),icon_only: s.boolean().optional().nullable()})).optional().nullable(),
 address: s.object({name: s.string().optional().nullable(),street: s.string().optional().nullable(),zipcode: s.string(),city: s.string(),country: s.string()}),
 vcf_file: s.string().optional().nullable(),
 slug: s.path()
})
export const editor = { name: "Editor", pattern: "settings/editor.json", single: true, schema: EditorSchema}

export const collections = {image, link, card, team, places, home, courses, booking, pricelist, about, configuration, editor};
