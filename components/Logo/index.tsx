import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export const Logo = ({ width, height }: { width: number; height: number }) => {
  return (
    <Link href="/">
      <Image src="/logo.svg" alt="logo" width={width} height={height} />
    </Link>
  );
};