import { filter } from "lodash";
import { useCallback } from "react";
import { executeApi } from "~/client/api";

export const getCreatePositions = () => {
  return async function positions() {
    const data = await executeApi("positions", undefined);

    return data.map((position) => ({
      label: position.positionTitle,
      value: position.id,
    }));
  };
};

export function usePositions(){
  const getCreatePositionsCallback = useCallback(() => getCreatePositions()(), []);

  return {
    getCreatePositions: getCreatePositionsCallback,
  };
};

export const positions = getCreatePositions()

export const getPositions = async () => {
    const data = await positions();
    return data;
}
