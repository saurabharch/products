declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    NEXT_PUBLIC_SITE_TITLE: string
    NEXT_PUBLIC_URL: string
    NEXT_PUBLIC_PARTNER_FIRST_NAME: string
    NEXT_PUBLIC_PARTNER_LAST_NAME: string
    NEXT_PUBLIC_PARTNER_TWITTER: string
    NEXT_PUBLIC_SEO_KEYWORDS: string
    NEXT_PUBLIC_PRODUCT_DESCRIPTION: string
    NEXT_PUBLIC_CONVERTKIT_SIGNUP_FORM: string
    NEXT_PUBLIC_CONVERTKIT_TOKEN: string
    NEXT_PUBLIC_CONVERTKIT_SUBSCRIBER_KEY: string
    CONVERTKIT_BASE_URL: string
    NEXT_PUBLIC_GOOGLE_ANALYTICS: string
    NEXT_PUBLIC_SUPPORT_EMAIL: string
  }
}
