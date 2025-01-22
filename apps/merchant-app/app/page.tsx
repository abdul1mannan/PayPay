"use client";

import { useBalance } from "@abdul1mannan/store/useBalance";

export default function Page(): JSX.Element {
  const balance = useBalance();
  return <div>hi there {balance}</div>;
}
