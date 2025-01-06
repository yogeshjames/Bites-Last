import React from 'react';
import Plus from './Plus';
import Cart from './Cart';
import '@/styles/cart.css';
export default function AddToCart({ addToCart, removeFromCart , ...props }) {
  const [status, setStatus] = React.useState('removed');

  React.useEffect(() => {
    if (status === 'adding') {
      const id = setTimeout(() => {
        setStatus('added');
      }, 2000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [status]);

  function handleClick() {
    if (status === 'removed') {
      setStatus('adding');

      if (typeof addToCart === 'function') {
        addToCart();
      }
    } else if (status === 'added') {
      setStatus('removed');

      if (typeof removeFromCart === 'function') {
        removeFromCart();
      }
    }
  }

  return (
    <button
      className={`add-to-cart ${status}`}
      type="button"
      aria-live="polite"
      {...props}
      onClick={handleClick}
    >
      <span
        className="removed text"
        aria-hidden={status !== 'removed' ? 'true' : 'false'}
      >
        <Plus className="plus-icon" /> Add to cart
      </span>

      <span aria-hidden="true" className="dotdotdot">
        <span className="dot one" />
        <span className="dot two" />
        <span className="dot three" />
      </span>

      <Cart aria-hidden="true" className="cart-icon" />

      <span
        className="added text"
        aria-hidden={status !== 'added' ? 'true' : 'false'}
      >
        Added
      </span>
    </button>
  );
}
