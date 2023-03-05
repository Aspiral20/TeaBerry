import React, { FC } from 'react';

const LocationIcon: FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <svg
      className={"location_icon " + className}
      {...rest}
      fill="#000000"
      height="800px"
      width="800px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path d="M256,0C149.703,0,63.224,86.479,63.224,192.776c0,103.482,177.549,307.132,185.107,315.75
			c1.937,2.208,4.731,3.474,7.669,3.474s5.732-1.266,7.669-3.474c7.558-8.618,185.107-212.268,185.107-315.75
			C448.776,86.479,362.297,0,256,0z M255.999,486.132c-14.85-17.528-49.056-58.896-82.955-106.913
			c-58.501-82.86-89.422-147.332-89.422-186.442c0-95.049,77.328-172.378,172.378-172.378s172.378,77.328,172.377,172.378
			c0,39.086-30.886,103.509-89.32,186.301C305.146,427.122,270.869,468.577,255.999,486.132z"/>
      <path d="M256,52.016c-75.36,0-136.669,61.309-136.669,136.669S180.64,325.355,256,325.355s136.669-61.309,136.669-136.669
			S331.36,52.016,256,52.016z M256,304.956c-64.112,0-116.271-52.16-116.271-116.271S191.888,72.414,256,72.414
			s116.271,52.16,116.271,116.271S320.112,304.956,256,304.956z"/>
      <path d="M260.088,437.45l-8.547-11.161c-3.425-4.471-9.826-5.32-14.299-1.896c-4.471,3.426-5.321,9.827-1.896,14.299l8.547,11.161
			c2.008,2.622,5.039,3.999,8.105,3.999c2.163,0,4.344-0.686,6.194-2.103C262.663,448.323,263.513,441.922,260.088,437.45z"/>
      <path d="M224.821,391.399l-25.647-33.489c-3.426-4.472-9.827-5.319-14.299-1.896c-4.472,3.426-5.321,9.827-1.896,14.299
			l25.647,33.489c2.008,2.622,5.039,3.999,8.105,3.999c2.163,0,4.343-0.686,6.194-2.103
			C227.397,402.272,228.246,395.871,224.821,391.399z"/>
    </svg>
  );
};

export default LocationIcon;