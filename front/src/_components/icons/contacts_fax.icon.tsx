import React, { FC } from 'react';

const ContactsFaxIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={className + ' contacts_fax_icon'}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M13.693 10.812l1.306 2.452-.928.492c-2.506 1.238-6.783-6.771-4.346-8.141l.936-.499 1.307 2.455-.926.493c-.734.427.974 3.633 1.727 3.238l.924-.49zm10.307.188v12h-24v-12h4v-10h10.328c1.538 0 5.672 4.852 5.672 6.031v3.969h4zm-18 5h12v-8.396c0-1.338-2.281-1.494-3.25-1.229.453-.813.305-3.375-1.082-3.375h-7.668v13zm16-3h-2v5h-16v-5h-2v8h20v-8z"/>
    </svg>
  );
};

export default ContactsFaxIcon;