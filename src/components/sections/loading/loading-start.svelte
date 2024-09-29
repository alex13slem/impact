<script lang="ts">
  //@ts-ignore
  import bg from '@/assets/img/bg.webp';
  //@ts-ignore
  //@ts-ignore
  import {
    loading,
    mapVisible,
    sloganVisible,
    storageIntroIsSeen,
  } from '@/lib/stores/pageLoadingStore';

  import { cn } from '@/lib/utils';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { blur } from 'svelte/transition';
  import SvgMap from '../../russian-map/svg-map.svelte';

  export let showOnPage = false;

  let root: HTMLElement;
  let introIsSeen: boolean | null = true;

  function loadingComplete() {
    document.body.classList.add('loaded');
    loading.set(false);
    $storageIntroIsSeen = true;
  }

  function loadingStart() {
    loading.set(true);
    mapVisible.set(false);
    sloganVisible.set(false);
  }

  const animateMap = async () => {
    gsap
      .timeline({
        onStart: loadingStart,
      })
      .add([
        gsap.set('#loading-section .map', {
          opacity: 0,
        }),
        gsap.set('#loading-section .impact .letter', {
          opacity: 0,
        }),
        gsap.set('#loading-section .slogan', {
          opacity: 0,
        }),
      ])
      .delay(1)
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
        // gsap.to('#loading-section img.h-line.top', {
        //   translateX: '-100%',
        //   duration: 1,
        //   ease: 'back.out',
        //   opacity: 0,
        // }),
        // gsap.to('#loading-section img.h-line.bottom', {
        //   translateX: '100%',
        //   duration: 1,
        //   ease: 'back.out',
        //   opacity: 0,
        //   delay: 0.1,
        // }),
        // gsap.to('#loading-section img.v-line.left', {
        //   translateY: '100%',
        //   duration: 1,
        //   ease: 'back.out',
        //   opacity: 0,
        //   delay: 0.2,
        // }),
        // gsap.to('#loading-section img.v-line.right', {
        //   translateY: '-100%',
        //   duration: 1,
        //   ease: 'back.out',
        //   opacity: 0,
        //   delay: 0.3,
        // }),
        gsap.to('#loading-section .impact .letter', {
          opacity: 1,
          stagger: 0.1,
          delay: 0.5,
        }),
        gsap.to('#loading-section .slogan', {
          opacity: 1,
        }),
        gsap.fromTo(
          '#loading-section .slogan span',
          {
            opacity: 0,
            scale: 1.5,
            translateY: '100%',
          },
          {
            opacity: 1,
            scale: 1,
            translateY: 0,
            delay: 1.2,
            duration: 1,
            ease: 'power3',
            stagger: 1 / 3,
            onStart: () => {
              sloganVisible.set(true);
            },
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
          },
        ),
      ])
      .add([
        gsap.to(
          '#loading-section .impact, #loading-section .slogan, #loading-section .logo',
          {
            // filter: 'blur(10px)',
            // scale: 2,
            ease: 'power2.inOut',
            opacity: 0,
            duration: 0.5,
            onStart: loadingComplete,
            delay: 5,
          },
        ),
        gsap.to('#loading-section .map', {
          transformOrigin: 'center',
          ease: 'power2.inOut',
          duration: 1,
          opacity: 0,
          scale: 2,
          delay: 5,
        }),
      ]);
  };

  onMount(async () => {
    storageIntroIsSeen.subscribe(value => {
      introIsSeen = value;
    });
    if (!showOnPage || introIsSeen) {
      // if (!showOnPage) {
      loadingComplete();
    } else {
      animateMap();
    }

    // animateMap();
  });
</script>

<svelte:head>
  {#if $loading && showOnPage && !introIsSeen}
    <!-- {#if true} -->
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<!-- {#if true} -->
{#if $loading && showOnPage}
  <section
    bind:this={root}
    transition:blur={{ duration: 1000 }}
    id="loading-section"
    class={cn('bg-cover fixed inset-0 z-50 overflow-clip', {
      // 'opacity-0': !showOnPage,
      'opacity-0': !showOnPage || introIsSeen,
    })}
    style="background-image: url({bg.src});"
  >
    <div class="container h-svh px-0 relative z-0 grid place-items-center">
      <SvgMap
        className={cn(
          'col-start-1 col-end-1 row-start-1 row-end-1 p-4 map pointer-events-none ',
        )}
      />
      <!-- <img
        class={cn(
          ' absolute v-line left left-[calc(50%-55px)] md:left-[calc(50%-78px)] top-[calc(50%-210px)]',
        )}
        src={line420.src}
        alt=""
      />
      <img
        class={cn(
          ' absolute v-line right left-[calc(50%+53px)] md:left-[calc(50%+75px)] top-[calc(50%-210px)]',
        )}
        src={line420.src}
        alt=""
      />
      <img
        class={cn(
          ' absolute h-line top top-[calc(50%-97px)] md:top-[calc(50%-136px)]',
        )}
        src={line460.src}
        alt=""
      />
      <img
        class={cn(
          'absolute h-line bottom top-[calc(50%+96px)] md:top-[calc(50%+135px)]',
        )}
        src={line460.src}
        alt=""
      /> -->

      <svg
        class="logo relative col-start-1 col-end-1 row-start-1 row-end-1 text-[12rem] md:text-[271px]"
        width="1em"
        height="1em"
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

      <div
        class="col-start-1 col-end-1 row-start-1 row-end-1 relative grid gap-1 md:gap-3"
      >
        <h1 class="impact">
          <span hidden>IMPACT</span>
          <svg
            class="w-[270px] h-auto md:w-auto mx-auto"
            width="452"
            height="74"
            viewBox="0 0 452 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="letter opacity-0"
              d="M17.3266 71.264H0V2.15358H17.3266V71.264Z"
              fill="currentColor"
            />
            <path
              class="letter opacity-0"
              d="M129.117 71.264H112.672L113.063 18.1097L90.842 71.264H75.0817L52.6649 18.1097C52.9259 51.7839 53.0564 69.502 53.0564 71.264H36.6109V2.15358H61.6708L83.1087 52.8607L104.351 2.15358H129.117V71.264Z"
              fill="currentColor"
            />
            <path
              class="letter opacity-0"
              d="M148.745 2.15358H191.719C197.135 2.15358 201.703 2.77355 205.423 4.0135C209.208 5.18818 212.21 7.66806 214.429 11.4531C216.452 14.7161 217.464 18.8275 217.464 23.7873C217.464 29.6607 215.93 34.3594 212.863 37.8835C210.187 40.9507 207.12 42.9411 203.661 43.8548C200.202 44.7684 195.602 45.2252 189.859 45.2252H165.778V71.264H148.745V2.15358ZM165.778 14.0962V33.0869H187.02C191.066 33.0869 193.872 32.7606 195.438 32.108C198.636 30.8028 200.235 28.0292 200.235 23.7873C200.235 21.2422 199.517 18.9907 198.081 17.0329C196.646 15.0751 194.329 14.0962 191.131 14.0962H165.778Z"
              fill="currentColor"
            />
            <path
              class="letter opacity-0"
              d="M296.261 71.264H276.879L271.006 58.2446H235.57L229.696 71.264H210.803L244.184 2.15358H262.881L296.261 71.264ZM265.426 46.0084L253.386 18.9907L241.149 46.0084H265.426Z"
              fill="currentColor"
            />
            <path
              class="letter opacity-0"
              d="M365.372 47.7704H383.481C383.025 49.7282 382.307 51.7186 381.328 53.7417C380.414 55.7647 378.881 58.0162 376.727 60.4961C374.639 62.976 372.126 65.1622 369.19 67.0547C366.318 68.882 362.5 70.4156 357.736 71.6556C353.038 72.9608 347.817 73.6134 342.074 73.6134C329.414 73.6134 319.331 70.4156 311.826 64.0201C304.321 57.5594 300.569 48.423 300.569 36.6109C300.569 25.843 304.19 17.0655 311.434 10.2785C318.743 3.42616 329.283 0 343.053 0C353.364 0 361.978 2.12095 368.896 6.36286C375.813 10.5395 380.414 15.5972 382.698 21.5358L363.806 23.8852C358.911 16.4455 351.993 12.7257 343.053 12.7257C338.68 12.7257 334.83 13.4762 331.502 14.9772C328.174 16.4782 325.596 18.4686 323.769 20.9485C322.007 23.4284 320.669 26.0061 319.755 28.6818C318.907 31.3575 318.482 34.0658 318.482 36.8067C318.482 43.5937 320.799 49.304 325.433 53.9375C330.131 58.5709 336.168 60.8877 343.542 60.8877C354.049 60.8877 361.326 56.5152 365.372 47.7704Z"
              fill="currentColor"
            />
            <path
              class="letter opacity-0"
              d="M452 14.7814H426.451V71.264H409.026V14.7814H383.379V2.15358H452V14.7814Z"
              fill="currentColor"
            />
          </svg>
        </h1>
        <p
          class={cn(
            {
              'opacity-0': !$sloganVisible,
            },
            'slogan flex justify-between font-road-radio text-sm md:text-2xl leading-none',
          )}
        >
          <span>МЕЧТА</span>
          <span>ВОЗМОЖНОСТЬ</span>
          <span>РЕЗУЛЬТАТ</span>
        </p>
      </div>
    </div>
  </section>
{/if}
