import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useRouter} from 'next/router'
import {redeemFullPriceCoupon} from '../utils/redeem-full-price-coupon'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

interface RedeemDialogProps {
  open: boolean
  couponId: string
}

const RedeemDialog = ({open = false, couponId}: RedeemDialogProps) => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async ({email}) => {
      const purchase = await redeemFullPriceCoupon({email, couponId})

      if (purchase.error) {
        console.error(purchase.message)
      } else {
        router.push(`/thanks/redeem?purchaseId=${purchase?.id}`)
      }
    },
  })
  return (
    <AlertDialogPrimitive.Root open={open}>
      <Content>
        <AlertDialogPrimitive.Title className="text-xl font-bold px-8 pt-8 ">
          Do you want to redeem this coupon?
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className="text-gray-200 px-8 pt-4 pb-8 border-b border-gray-700/50">
          Enter the email address you wish to be associated with your license.
        </AlertDialogPrimitive.Description>
        <form onSubmit={formik.handleSubmit} className="py-4 px-8">
          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="pb-1">
              Email address
            </label>
            <input
              required
              className="bg-gray-900 border-gray-800 border rounded-sm px-4 py-2 focus-visible:border-transparent"
              id="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex justify-end py-8 w-full gap-3">
            <AlertDialogPrimitive.Cancel asChild>
              <button
                onClick={(e) => {
                  const code = router.query.code
                  const pathname = router.asPath.replace(`?code=${code}`, '')
                  router.push(pathname)
                }}
                className="flex py-2 px-4 text-sm font-medium rounded-sm text-gray-300 bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <button
                className="flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm bg-orange-300 text-black hover:brightness-105 transitions focus:outline-none focus:ring-white"
                type="submit"
              >
                Yes, Claim License
              </button>
            </AlertDialogPrimitive.Action>
          </div>
        </form>
      </Content>
    </AlertDialogPrimitive.Root>
  )
}

export default RedeemDialog

const Content: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed bg-black bg-opacity-30 backdrop-blur-sm inset-0 z-40" />
      <AlertDialogPrimitive.Content
        className="animate-fade-in-out shadow-xl z-50 bg-gray-800 w-full max-w-[95%] rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-md"
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  )
}
