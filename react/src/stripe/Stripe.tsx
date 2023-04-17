import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const Public_key="pk_test_51Mun5SAPtKEN9gtTdLtXOZFeG7s1vBN6ppcawbs0FPljNn0JGTrutJ31TBmzs9IP37Qy1SiGJhmc7CUUaF9XWIfr00aRes2rdt"
const stripeFn=loadStripe(Public_key)
const Stripe = () => {
  return (
    <Elements stripe={stripeFn}>

    </Elements>
  )
}

export default Stripe