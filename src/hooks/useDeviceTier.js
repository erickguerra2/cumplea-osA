import { useMemo } from 'react';
import { getDeviceTier } from '../utils/performance';

/** Devuelve 'low' | 'medium' | 'high' (estable durante la sesion). */
export function useDeviceTier() {
  return useMemo(() => getDeviceTier(), []);
}

export default useDeviceTier;
