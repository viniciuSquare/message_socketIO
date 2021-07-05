import { useContext } from "react";
import { ChannelContext } from "../contexts/ChannelsContext";

export function useChannel() {
  const value = useContext(ChannelContext)

  return value;
}