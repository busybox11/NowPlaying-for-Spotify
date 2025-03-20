import { PlayerState } from "@/types/player";
import { useMemo } from "react";

import {
  LuPhone,
  LuTablet,
  LuSpeaker,
  LuTv,
  LuMusic,
  LuLaptop,
} from "react-icons/lu";

const DEVICE_TYPES_ICONS = {
  computer: LuLaptop,
  phone: LuPhone,
  tablet: LuTablet,
  speaker: LuSpeaker,
  tv: LuTv,
  other: LuMusic,
};

export default function usePlayingDevice(
  previousPlayerState: PlayerState,
  playerState: PlayerState
) {
  const device = useMemo(
    () => playerState?.device ?? previousPlayerState?.device,
    [playerState, previousPlayerState]
  );

  const DeviceIcon = useMemo(() => {
    if (!device) return DEVICE_TYPES_ICONS.other;

    return (
      DEVICE_TYPES_ICONS[device.type as keyof typeof DEVICE_TYPES_ICONS] ??
      DEVICE_TYPES_ICONS.other
    );
  }, [device]);

  return {
    device,
    DeviceIcon,
  };
}
