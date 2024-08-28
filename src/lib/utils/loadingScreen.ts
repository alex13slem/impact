import { gsap } from 'gsap';
import { loading, mapVisible } from '../stores/pageLoadingStore';

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
    ])
    .add([
      gsap.to('#loading-section path.small', {
        scale: 0,

        opacity: 0,
        duration: 1.5,
        ease: 'back.out',
        transformOrigin: 'center center',
        filter: 'blur(10px)',
      }),
      gsap.to('#loading-section path.big', {
        scale: 0,

        opacity: 0,
        duration: 1.5,
        ease: 'back.out',
        transformOrigin: 'center center',
        filter: 'blur(10px)',
      }),
      gsap.to('#loading-section path.mid', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out',
        transformOrigin: 'center center',
        filter: 'blur(10px)',
      }),
      gsap.to('#loading-section img.h-line.top', {
        translateX: '-100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
      }),
      gsap.to('#loading-section img.h-line.bottom', {
        translateX: '100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
        delay: 0.1,
      }),
      gsap.to('#loading-section img.v-line.left', {
        translateY: '100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
        delay: 0.2,
      }),
      gsap.to('#loading-section img.v-line.right', {
        translateY: '-100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
        delay: 0.3,
      }),
      gsap.to('#loading-section .impact .letter', {
        opacity: 1,
        stagger: 0.1,
        delay: 0.5,
      }),
      gsap.to('#loading-section .slogan span', {
        opacity: 1,
        scale: 1,
        translateY: 0,
        delay: 1.2,
        duration: 1,
        ease: 'power3',
        stagger: 1 / 3,
        onComplete: () => {
          gsap.fromTo(
            '#loading-section .map',
            {
              opacity: 0,
            },
            {
              opacity: 1,
              ease: 'power3.out',
              duration: 1.5,
              onStart: () => {
                mapVisible.set(true);
              },
            },
          );
        },
      }),
    ])
    .add([
      gsap.to(
        '#loading-section .impact, #loading-section .slogan, #loading-section .logo',
        {
          delay: 5,
          filter: 'blur(10px)',
          scale: 2,
          ease: 'power2.inOut',
          opacity: 0,
          duration: 0.5,
          onStart: () => {
            document.body.classList.remove('loading');
            loading.set(false);
          },
        },
      ),
      gsap.to('#loading-section .map', {
        delay: 5,
        transformOrigin: 'left center',
        ease: 'power2.inOut',
        duration: 0.5,
        scale: 0.9,
      }),
    ]);
}
