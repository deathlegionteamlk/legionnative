import { useRouter } from './Router';

export function useNavigation() {
  const { navigate, goBack, replace, setOptions } = useRouter();

  return {
    navigate,
    goBack,
    replace,
    setOptions,
    push: navigate,
    pop: goBack,
  };
}
