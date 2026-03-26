import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SmartLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SmartLink({ href, className, children, onClick }: SmartLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Route link (starts with / but not a hash)
  if (href.startsWith('/') && !href.startsWith('/#')) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Hash link
  if (href.startsWith('#')) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onClick?.();

      if (location.pathname === '/') {
        // On homepage: scroll to section
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // On inner page: navigate to homepage with hash
        navigate('/' + href);
      }
    };

    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  // External or other links: plain anchor
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
