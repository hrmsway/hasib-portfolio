import { SceneView } from "@/components/three/scene-view";
import { PillButton } from "@/components/ui/pill-button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <SceneView
        scene="accent-blob"
        fallbackSrc="/fallbacks/accent-blob.avif"
        className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-40"
      />
      <div className="relative z-20 flex flex-col items-center">
        <p className="mono-label text-ink-faint mb-6">404 — Not found</p>
        <h1 className="type-mega text-ink">Lost in the void.</h1>
        <p className="mono-body text-ink-dim mt-6 max-w-sm">
          This page either never existed or has been quietly decommissioned.
        </p>
        <div className="mt-10">
          <PillButton href="/" variant="filled">
            Back home
          </PillButton>
        </div>
      </div>
    </div>
  );
}
