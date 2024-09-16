<script lang="ts">
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  //@ts-ignore
  import line420 from '@/assets/img/line-420.svg';
  //@ts-ignore
  import line460 from '@/assets/img/line-460.svg';
  import {
    regularLoadProcess,
    storageIntroIsSeen,
  } from '@/lib/stores/pageLoadingStore';

  import { cn } from '@/lib/utils';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let isHome: boolean = false;

  function loadingComplete() {
    regularLoadProcess.set(false);
    document.body.classList.add('loaded');
  }

  function loadingStart() {
    regularLoadProcess.set(true);
  }

  const animate = async () => {
    const tl = gsap.timeline({
      onStart: loadingStart,
    });
    tl.delay(1);
    tl.add([
      gsap.to('#loading-regular .logo path.small', {
        scale: 0,

        opacity: 0,
        duration: 1.5,
        ease: 'back.out',
        transformOrigin: 'center center',
        filter: 'blur(10px)',
      }),
      gsap.to('#loading-regular .logo path.big', {
        scale: 0,

        opacity: 0,
        duration: 1.5,
        ease: 'back.out',
        transformOrigin: 'center center',
        filter: 'blur(10px)',
      }),
      gsap.to('#loading-regular .logo path.mid', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out',
        transformOrigin: 'center center',
        filter: 'blur(10px)',
      }),
      gsap.to('#loading-regular img.h-line.top', {
        translateX: '-100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
      }),
      gsap.to('#loading-regular img.h-line.bottom', {
        translateX: '100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
        delay: 0.1,
      }),
      gsap.to('#loading-regular img.v-line.left', {
        translateY: '100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
        delay: 0.2,
      }),
      gsap.to('#loading-regular img.v-line.right', {
        translateY: '-100%',
        duration: 1,
        ease: 'back.out',
        opacity: 0,
        delay: 0.3,
      }),
    ]);
    tl.to(
      ' #loading-regular',
      {
        // filter: 'blur(10px)',
        // scale: 2,
        ease: 'power2.inOut',
        opacity: 0,
        duration: 0.7,
        onComplete: loadingComplete,
      },
      '-=1',
    );
  };

  onMount(() => {
    if (!$storageIntroIsSeen && isHome) {
      loadingComplete();
    } else {
      animate();
    }

    // animateMap();
  });
</script>

<svelte:head>
  <!-- {#if $loading && showOnPage} -->
  {#if $regularLoadProcess && (!isHome || $storageIntroIsSeen)}
    <!-- {#if true} -->
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<!-- {#if true} -->
{#if $regularLoadProcess && (!isHome || $storageIntroIsSeen)}
  <section
    transition:fade={{ duration: 300 }}
    id="loading-regular"
    class={cn(
      'h-svh bg-cover fixed inset-0 z-50 pt-[76px] md:pt-[112px] lg:pt-[121px] overflow-clip',
    )}
    style="background-image: url({bg.src});"
  >
    <div
      class="container min-h-[calc(100svh-76px)] md:min-h-[calc(100svh-112px)] lg:min-h-[calc(100svh-121px)] pb-5 md:pb-8 lg:pb-10 px-0 relative z-0 grid place-items-center"
    >
      <img
        class={cn(
          ' absolute v-line left left-[calc(50%-76px)] top-[calc(50%-230px)]',
        )}
        src={line420.src}
        alt=""
      />
      <img
        class={cn(
          ' absolute v-line right left-[calc(50%+76px)] top-[calc(50%-230px)]',
        )}
        src={line420.src}
        alt=""
      />
      <img
        class={cn(' absolute h-line top top-[calc(50%-157px)]')}
        src={line460.src}
        alt=""
      />
      <img
        class={cn('absolute h-line bottom top-[calc(50%+114px)]')}
        src={line460.src}
        alt=""
      />

      <svg
        class="logo relative col-start-1 col-end-1 row-start-1 row-end-1"
        width="152"
        height="271"
        viewBox="0 0 152 271"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="small"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M35.2832 35.6938H116.469V69.4785H95.0888L95.0888 201.847H116.469L116.469 235.58L35.2832 235.743L35.2832 201.847H56.8833L56.8833 69.4785H35.2832V35.6938ZM43.885 44.2957V60.8766H65.4852L65.4851 210.449H43.885L43.885 227.124L107.867 226.995L107.867 210.449H86.487L86.487 60.8766H107.867V44.2957H43.885Z"
          fill="url(#paint2_linear_2289_147)"
        />
        <path
          class="mid"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.6782 18.2207H134.107V88.0631H113.431V184.014H134.107V252.99L17.6782 253.224V184.014H39.2783V88.0631H17.6782V18.2207ZM26.2801 26.8226V79.4612H47.8802V192.616H26.2801V244.604L125.505 244.405V192.616H104.829V79.4612H125.505V26.8226H26.2801Z"
          fill="url(#paint1_linear_2289_147)"
        />
        <path
          class="big"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0H151.757V104.522H130.542V166.292H151.757V270.49H86.7866V261.888H143.155V174.894H121.94V95.9204H143.155V8.60185H8.60183V95.9204H30.2448V174.894H8.60183V261.888H65.6504V270.49H0V166.292H21.643V104.522H0V0Z"
          fill="url(#paint0_linear_2289_147)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2289_147"
            x1="96.5668"
            y1="24.1439"
            x2="4.30053"
            y2="270.395"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FBD26D" />
            <stop offset="0.485" stop-color="#C4801D" />
            <stop offset="1" stop-color="#E0A350" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2289_147"
            x1="75.8925"
            y1="22.5216"
            x2="75.8925"
            y2="248.914"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFD278" />
            <stop offset="0.0001" stop-color="#FFD278" />
            <stop offset="0.585" stop-color="#B47A31" />
            <stop offset="1" stop-color="#E0A350" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2289_147"
            x1="75.8762"
            y1="39.9948"
            x2="75.8762"
            y2="231.433"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFD278" />
            <stop offset="0.0001" stop-color="#FFD278" />
            <stop offset="0.585" stop-color="#B47A31" />
            <stop offset="1" stop-color="#E0A350" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </section>
{/if}
