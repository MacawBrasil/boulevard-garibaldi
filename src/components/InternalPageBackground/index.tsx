import { cn } from '@/lib/utils'

type InternalPageBackgroundProps = {
  className?: string
}

export function InternalPageBackground({ className }: InternalPageBackgroundProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1172"
        fill="none"
        className="absolute inset-0 size-full"
        preserveAspectRatio="none"
      >
        <g opacity="0.7" filter="url(#internal-page-bg-noise)">
          <rect width="1920" height="1172" fill="#F4F4F4" />
          <rect width="1920" height="1172" fill="url(#internal-page-bg-gradient)" />
        </g>
        <defs>
          <filter
            id="internal-page-bg-noise"
            x="0"
            y="0"
            width="1920"
            height="1172"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.38461539149284363 0.38461539149284363"
              stitchTiles="stitch"
              numOctaves="3"
              result="noise"
              seed="8611"
            />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA
                type="discrete"
                tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
              />
            </feComponentTransfer>
            <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
            <feFlood floodColor="#B5B5B5" result="color1Flood" />
            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
            <feMerge result="effect1_noise_75_472">
              <feMergeNode in="shape" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>
          <linearGradient
            id="internal-page-bg-gradient"
            x1="-1.38668e-06"
            y1="424.778"
            x2="521.768"
            y2="1405.22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4F4F4" />
            <stop offset="1" stopColor="#F4F4F4" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(-9.446296671312354deg, rgba(244, 244, 244, 0.4) 4.0495%, rgb(244, 244, 244) 73.68%)',
        }}
      />
    </div>
  )
}
