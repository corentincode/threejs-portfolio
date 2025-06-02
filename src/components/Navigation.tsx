'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projects' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const linkWrappers = navRef.current?.querySelectorAll('.animated-link-wrapper');

    if (!linkWrappers) return;

    const splitInstances: SplitType[] = [];

    linkWrappers.forEach((linkWrapper) => {
      const text1 = linkWrapper.querySelector('.link-text-1') as HTMLElement | null;
      const text2 = linkWrapper.querySelector('.link-text-2') as HTMLElement | null;
      const underline = linkWrapper.querySelector('.underline') as HTMLElement | null;

      if (!text1 || !text2 || !underline) return;

      const splitText1 = new SplitType(text1, { types: 'chars' });
      const splitText2 = new SplitType(text2, { types: 'chars' });
      splitInstances.push(splitText1, splitText2);

      // État initial: texte 1 visible, texte 2 en dessous, soulignement caché
      gsap.set(splitText1.chars, { yPercent: 0, rotationX: 0 });
      gsap.set(splitText2.chars, { yPercent: 100, rotationX: -90 });
      gsap.set(underline, { scaleX: 0, originX: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(splitText1.chars, { yPercent: -100, duration: 0.35, ease: 'power3.easeOut', stagger: 0.015 })
        .to(splitText2.chars, { yPercent: 0, rotationX: 0, duration: 0.35, ease: 'power3.easeOut', stagger: 0.015 }, 0)
        .to(underline, { scaleX: 1, duration: 0.35, ease: 'power3.easeOut' }, 0);

      const handleMouseEnter = () => {
        console.log(`MouseEnter on: ${linkWrapper.textContent?.trim()}`);
        tl.play();
      };

      const handleMouseLeave = () => {
        console.log(`MouseLeave on: ${linkWrapper.textContent?.trim()}`);
        tl.reverse();
      };

      linkWrapper.addEventListener('mouseenter', handleMouseEnter);
      linkWrapper.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function for event listeners specific to this linkWrapper
       return () => {
           linkWrapper.removeEventListener('mouseenter', handleMouseEnter);
           linkWrapper.removeEventListener('mouseleave', handleMouseLeave);
       };
    });

    // Global cleanup for all SplitType instances
     return () => {
         splitInstances.forEach(instance => instance.revert());
     };

  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16" ref={navRef}>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative overflow-hidden inline-block cursor-pointer animated-link-wrapper"
                style={{
                  letterSpacing: '0.1rem',
                  height: '36px',
                  lineHeight: '36px',
                  minWidth: '125px',
                  textAlign: 'center'
                }}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-300 rounded-md text-sm font-medium transition-colors z-10 relative inline-block w-full h-full flex flex-col justify-center"
                  style={{ textDecoration: 'none'}}
                >
                  <span className="link-text link-text-1 whitespace-nowrap absolute top-0 left-0 w-full block" style={{ fontSize: '1.5rem', color: '#ffffff' }}>{item.name}</span>
                  <span className="link-text link-text-2 whitespace-nowrap absolute top-0 left-0 w-full text-center whitespace-nowrap block" style={{ fontSize: '1.5rem', color: '#ffffff' }}>{item.name}</span>
                </Link>
                <span className="underline absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left transform scale-x-0"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 