import Image from 'next/image';

import logo from '@/assets/images/logo.png';

export default function Logo() {
  return (
    <div>
      <Image src={logo} alt="EcoPulse Logo" width={30} height={30} />
    </div>
  );
}
