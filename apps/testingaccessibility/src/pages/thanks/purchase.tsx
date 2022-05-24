import * as React from 'react'
import {GetServerSideProps} from 'next'
import {stripe} from 'utils/stripe'
import {Stripe} from 'stripe'
import Layout from 'components/app/layout'
import Image from 'next/image'
import NewMailImage from '../../../public/assets/new-mail@2x.png'

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const {session_id} = query

  const checkoutSession = await stripe.checkout.sessions.retrieve(
    session_id as string,
    {
      expand: ['customer'],
    },
  )

  const {customer} = checkoutSession
  const {email, name} = customer as Stripe.Customer

  return {
    props: {
      email,
      name,
    },
  }
}

const ThanksVerify: React.FC<{name: string; email: string}> = ({
  name,
  email,
}) => {
  return (
    <Layout className="bg-green-700 bg-noise">
      <main className="flex flex-col flex-grow items-center justify-center pt-5 pb-16 px-5 text-white">
        <div className="flex flex-col max-w-screen-md mx-auto w-full gap-5 items-center text-center">
          <Image
            priority
            width={500 / 2.25}
            height={451 / 2.25}
            quality={100}
            placeholder="blur"
            src={NewMailImage}
            alt="a wooden sign with the words 'check your inbox'"
          />
          <div>
            <p className=" text-sand-100 sm:text-lg">
              Thank you for purchasing Testing Accessibility!
            </p>
            <h1 className="max-w-lg mx-auto font-bold lg:text-4xl text-3xl py-5 font-aglet-sans">
              Please check your inbox for a login link that just got sent.
              <code className="px-5 py-2 rounded-md bg-black/20 inline-block my-10 font-aglet-sans font-semibold sm:text-2xl text-xl">
                {email}
              </code>
            </h1>
            <p className="text-sand-100 text-lg leading-relaxed mx-auto">
              As a final step to access the course you need to check your inbox
              (<strong>{email}</strong>) where you will find an email from{' '}
              <strong>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</strong> with a
              link to access your purchase and start learning.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default ThanksVerify
