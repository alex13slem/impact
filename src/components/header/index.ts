import Header from './index.svelte';

const headerOffsets = {
  top: '-top-[76px] md:-top-[112px] lg:-top-[107px] xl:-top-[121px]',
  height:
    'h-[calc(100svh-76px)] md:h-[calc(100svh-112px)] lg:h-[calc(100svh-107px)] xl:h-[calc(100svh-121px)]',
  margin: '-mt-[76px] md:-mt-[112px] lg:-mt-[107px] xl:-mt-[121px]',
};
export { Header, headerOffsets };
