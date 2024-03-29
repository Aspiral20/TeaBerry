import React, { FC } from 'react';

const ContactsLocationIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={className + ' contacts_location_icon'}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M11.467 8.444l.871 3.431 2.596-6.861-6.934 2.573 3.467.857zm.533-8.444c-4.418 0-8 3.479-8 7.77 0 4.358 3.5 7.337 8 11.23 4.5-3.893 8-6.872 8-11.23 0-4.291-3.582-7.77-8-7.77zm0 13.723c-3.241 0-5.866-2.6-5.866-5.806s2.625-5.806 5.866-5.806 5.866 2.6 5.866 5.806-2.625 5.806-5.866 5.806zm8 2.277h-1.801c-.629.673-1.316 1.335-2.041 2h2.605l.5 1h-4.218l-1.146 1h1.025l.858 2h-7.487l.858-2h.947c-.389-.336-.772-.669-1.147-1h-1.995l-1.011-1h1.895c-.725-.664-1.41-1.327-2.039-2h-1.803l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z"/>
    </svg>
  );
};

export default ContactsLocationIcon;