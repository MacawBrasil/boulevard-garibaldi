import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { pt } from 'payload/i18n/pt'
import { en } from 'payload/i18n/en'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ShopsAndServices } from './collections/shopsAndServices'
import { Gastronomy } from './collections/gastronomy'
import { Events } from './collections/events'
import { Gallery } from './collections/gallery'
import { LegalPages } from './collections/legalPages'
import { Contact } from './globals/Contact'
import { EventsPage } from './globals/EventsPage'
import { GastronomyPage } from './globals/GastronomyPage'
import { GeneralSettings } from './globals/GeneralSettings'
import { Home } from './globals/Home'
import { ShopsAndServicesPage } from './globals/ShopsAndServicesPage'
import { Footer } from './globals/footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
      fallbackLanguage: 'pt',
      supportedLanguages: { en, pt },
    },
  collections: [Users, Media, ShopsAndServices, Gastronomy, Events, Gallery, LegalPages],
  globals: [
    Home,
    Footer,
    Contact,
    EventsPage,
    GastronomyPage,
    ShopsAndServicesPage,
    GeneralSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
