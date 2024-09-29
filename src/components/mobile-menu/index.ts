import {
  mobileMenuMounted,
  mobileMenuVisible,
} from '@/lib/stores/mobileMenuStore';
import MobileMenu from './index.svelte';
import MobileMenuTrigger from './trigger.svelte';

export function handleClose() {
  mobileMenuVisible.set(false);
  setTimeout(() => {
    mobileMenuMounted.set(false);
  }, 500);
}

export function handleOpen() {
  mobileMenuMounted.set(true);
  mobileMenuVisible.set(true);
}

export { MobileMenu, MobileMenuTrigger };
