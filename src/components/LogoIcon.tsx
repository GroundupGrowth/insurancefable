interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = 'w-7 h-7' }: LogoIconProps) {
  return (
    /* SWAP-LATER: switch src to "/ie-logo-icon.webp" once the hexagonal IE mark
       is dropped into public/ */
    <img
      src="https://www.insuranceandestates.com/wp-content/uploads/ie-logo-icon-small-1.webp"
      alt="Insurance & Estates"
      className={className}
    />
  );
}
