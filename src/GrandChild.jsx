import { useContext } from "react";
import { UrlContext } from "./App";

export function GrandChild() {
  const log = useContext(UrlContext);
  return <>{log}</>;
}
