import React from "react";
import { useDeepCompareMemoize } from "./useDeepCompareMemoize";

export function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
