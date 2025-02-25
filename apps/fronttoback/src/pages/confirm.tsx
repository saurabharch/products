import React from 'react'
import Layout from 'components/app/layout'
import Image from 'next/image'
import EmailNotificationImage from '../../public/images/email-notification.svg'

const ConfirmSubscriptionPage = () => {
  return (
    <Layout meta={{title: 'Confirm your subscription'}}>
      <main className="flex-grow flex items-center justify-center flex-col px-5 bg-brand-purple">
        <Icon />
        <div className="max-w-screen-sm text-center font-light">
          <p className="sm:text-2xl pt-10 font-semibold">
            Thanks so much for signing up! There’s one last step.
          </p>
          <h1 className="font-bold lg:text-5xl text-4xl py-8 font-heading">
            Please check your inbox for an email that just got sent.
          </h1>
          <p className="sm:text-xl leading-relaxed max-w-lg mx-auto pb-8">
            You'll need to{' '}
            <strong className="font-bold">click the confirmation link</strong>{' '}
            to receive any further emails. If you don't see the email after a
            few minutes, you might{' '}
            <strong className="font-bold">check your spam folder</strong> or
            other filters and add{' '}
            <strong>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</strong> to your
            contacts.
          </p>
          <p className="sm:text-lg">
            Thanks, <br />
            <Signature />
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default ConfirmSubscriptionPage

export const Signature = () => {
  //TODO: add a signature
  return (
    <span className="w-36 mx-auto">
      <Image src="/images/signature.svg" alt="Chance" width={164} height={42} />
    </span>
  )
}

const Icon = () => {
  return <Image src={EmailNotificationImage} alt="You've got a mail" />
}
