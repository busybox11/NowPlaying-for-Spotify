"use client";

import { trpc } from "@/utils/trpc";

function TestTrpc() {
  const trpcHello = trpc.hello.useQuery();

  if (trpcHello.data) {
    return <div>{trpcHello.data}</div>;
  }

  if (trpcHello.error) {
    return <div>{trpcHello.error.message}</div>;
  }

  return <div>Loading...</div>;
}
export default trpc.withTRPC(TestTrpc);
