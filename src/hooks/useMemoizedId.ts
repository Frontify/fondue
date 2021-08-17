import generateRandomId from "@utilities/generateRandomId";
import { useMemo } from "react";

export const useMemoizedId = (id?: string): string => useMemo(() => id || generateRandomId(), [id]);
