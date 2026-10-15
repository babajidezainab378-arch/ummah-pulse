import dynamic from "next/dynamic";

/**
 * The whole app is loaded client-only. Almost everything UmmahPulse
 * does — the live clock, geolocation, localStorage, countdowns — is
 * browser-only, so rendering it during SSR would either crash or
 * produce a hydration mismatch. ssr:false sidesteps both cleanly.
 */
const App = dynamic(() => import("@/components/App"), {
  ssr: false,
  loading: () => <div className="up-boot" aria-hidden="true" />,
});

export default function Page() {
  return <App />;
}
