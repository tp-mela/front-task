import { forwardRef } from 'react';

export default forwardRef(function Button(
  { children, variant = 'primary', as: Component = 'button', className = '', ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={`btn btn--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
});
