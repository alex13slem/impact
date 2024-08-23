import { gsap } from 'gsap';
import { linesVisible, loading, mapVisible } from '../stores/pageLoadingStore';

export function loadingScreen() {
  gsap
    .timeline({})
    .add([
      gsap.set('#loading-section .map', {
        opacity: 0,
      }),
      gsap.set('#loading-section .impact .letter', {
        opacity: 0,
      }),
      gsap.to('#loading-section .impact .letter', {
        opacity: 1,
        stagger: 0.1,
        delay: 1,
        onStart: () => {
          gsap.to('#loading-section .logo', {
            opacity: 0.1,
          });
          gsap.to('#loading-section img.h-line.top', {
            translateY: '83px',
            scaleX: 1.2,
            duration: 0.5,
            ease: 'sine.inOut',
            opacity: 0,
          });
          gsap.to('#loading-section img.h-line.bottom', {
            translateY: '-118px',
            scaleX: 1.2,
            duration: 0.5,
            ease: 'sine.inOut',
            opacity: 0,
          });
          gsap.to('#loading-section img.v-line', {
            scaleY: 0.65,
            opacity: 0,
            duration: 0.5,
            ease: 'sine.inOut',
          });
          gsap.to(
            '#loading-section .slogan span',

            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power3',
              stagger: 0.5 / 3,
            },
          );
          gsap.to('#loading-section .map', {
            opacity: 1,
            ease: 'power3.out',
            duration: 1.5,
            onStart: () => {
              mapVisible.set(true);
            },
          });
        },
      }),
      gsap.fromTo(
        '#loading-section path.small',
        {
          scale: 0.9,
          duration: 2,
          ease: 'expo.out',
          transformOrigin: 'center center',
        },
        {
          opacity: 1,
          scale: 1,
        },
      ),
      gsap.fromTo(
        '#loading-section path.big',
        {
          scaleY: 0.852,
          scaleX: 0.72,
          duration: 2,
          ease: 'back.out',
          transformOrigin: 'center center',
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
        },
      ),
      gsap.fromTo(
        '#loading-section path.mid',
        {
          scaleY: 0.915,
          scaleX: 0.82,
          duration: 2,
          ease: 'expo.out',
          transformOrigin: 'center center',
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
        },
      ),
      gsap.fromTo(
        '#loading-section img.v-line',
        {
          translateY: '-100%',
          duration: 0.5,
          ease: 'sine.inOut',
          delay: 0.1,
          stagger: 0.2,
        },
        {
          opacity: 1,
          translateY: '0',
        },
      ),
      gsap.fromTo(
        '#loading-section img.h-line',
        {
          translateX: '-100%',
          duration: 0.5,
          ease: 'sine.inOut',
          delay: 0.3,
          stagger: 0.2,
          onComplete: () => {
            linesVisible.set(true);
          },
        },
        {
          opacity: 1,
          translateX: '0',
        },
      ),
    ])
    .add(
      gsap.to(
        '#loading-section .impact, #loading-section .slogan, #loading-section .logo',
        {
          delay: 0.5,
          filter: 'blur(10px)',
          scale: 2,
          ease: 'power2.inOut',
          opacity: 0,
          duration: 0.5,
          onStart: () => {
            loading.set(false);
          },
        },
      ),
    );
}
