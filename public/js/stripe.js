import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51MVfI4FXr2koWylriEG8sStwOuvADLGu5K6gIAl4H5sE7ZuyxkB4zyElQRRYAckQZjWaCl0ByZ2DLA6mxqvqk1P200fpeeYHZR'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const res = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);

    const session = await res.json();

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err.message);
  }
};
