import { useRouter } from './Router';

export function useRoute() {
  const router = useRouter();
  
  return {
    name: router.currentRoute,
    params: {}, 
  };
}
