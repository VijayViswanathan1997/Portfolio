import type { CoverKind } from "@/lib/content";

/**
 * Generated artwork for project panels, so every project reads as finished
 * before real screenshots exist. Drop a file in public/work/ and set
 * `image` on the project to replace it.
 *
 * Covers are deliberately light — the panel lays a dark gradient over the
 * bottom for the title, the same way a real screenshot would sit.
 */

const INK = "#211f3d";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <rect width="1200" height="760" fill="#efe9dc" />
      {children}
    </svg>
  );
}

function MapCover() {
  return (
    <Frame>
      {/* street grid */}
      <g stroke={INK} strokeOpacity="0.09" strokeWidth="2">
        {[80, 230, 380, 530, 680].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        {[120, 300, 480, 660, 840, 1020].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="760" />
        ))}
      </g>
      {/* blocks */}
      <g fill={INK} fillOpacity="0.05">
        <rect x="130" y="90" width="160" height="130" rx="8" />
        <rect x="490" y="240" width="160" height="130" rx="8" />
        <rect x="850" y="90" width="160" height="130" rx="8" />
        <rect x="310" y="390" width="160" height="130" rx="8" />
        <rect x="670" y="390" width="160" height="130" rx="8" />
      </g>
      {/* route */}
      <path
        d="M170 620 L170 470 Q170 440 200 440 L430 440 Q460 440 460 410 L460 210 Q460 180 490 180 L880 180"
        fill="none"
        stroke={INK}
        strokeOpacity="0.55"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* pickup + dropoff pins */}
      <circle cx="170" cy="620" r="17" fill={INK} />
      <circle cx="170" cy="620" r="6" fill="#efe9dc" />
      <g transform="translate(880 180)">
        <path
          d="M0-46c-18 0-32 14-32 32 0 22 32 50 32 50s32-28 32-50c0-18-14-32-32-32z"
          fill={INK}
        />
        <circle cy="-14" r="11" fill="#efe9dc" />
      </g>
      {/* trip card */}
      <g>
        <rect
          x="760"
          y="470"
          width="340"
          height="150"
          rx="18"
          fill="#faf7f0"
          opacity="0.96"
        />
        <rect x="788" y="500" width="120" height="11" rx="5.5" fill={INK} fillOpacity="0.35" />
        <rect x="788" y="528" width="210" height="16" rx="8" fill={INK} fillOpacity="0.8" />
        <rect x="788" y="562" width="150" height="11" rx="5.5" fill={INK} fillOpacity="0.2" />
        <rect x="788" y="588" width="90" height="11" rx="5.5" fill={INK} fillOpacity="0.2" />
        <circle cx="1052" cy="553" r="26" fill={INK} />
      </g>
    </Frame>
  );
}

function ServicesCover() {
  const tiles = [
    [150, 150],
    [430, 150],
    [710, 150],
    [150, 400],
    [430, 400],
    [710, 400],
  ];
  return (
    <Frame>
      <g>
        {tiles.map(([x, y], i) => (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="230"
              height="200"
              rx="20"
              fill="#faf7f0"
              opacity={0.95}
            />
            <rect
              x={x + 28}
              y={y + 28}
              width="56"
              height="56"
              rx="16"
              fill={INK}
              fillOpacity={0.75 - i * 0.09}
            />
            <rect
              x={x + 28}
              y={y + 108}
              width={150 - i * 14}
              height="13"
              rx="6.5"
              fill={INK}
              fillOpacity="0.3"
            />
            <rect
              x={x + 28}
              y={y + 138}
              width={100 - i * 8}
              height="11"
              rx="5.5"
              fill={INK}
              fillOpacity="0.16"
            />
          </g>
        ))}
      </g>
      {/* booking sheet */}
      <rect x="1000" y="150" width="260" height="450" rx="24" fill={INK} opacity="0.9" />
      <rect x="1030" y="190" width="140" height="13" rx="6.5" fill="#faf7f0" fillOpacity="0.4" />
      <rect x="1030" y="226" width="200" height="60" rx="12" fill="#faf7f0" fillOpacity="0.12" />
      <rect x="1030" y="302" width="200" height="60" rx="12" fill="#faf7f0" fillOpacity="0.12" />
      <rect x="1030" y="378" width="200" height="60" rx="12" fill="#faf7f0" fillOpacity="0.12" />
      <rect x="1030" y="470" width="200" height="48" rx="24" fill="#faf7f0" fillOpacity="0.85" />
    </Frame>
  );
}

function HealthCover() {
  return (
    <Frame>
      {/* chart card */}
      <rect x="110" y="120" width="620" height="330" rx="22" fill="#faf7f0" />
      <rect x="146" y="158" width="160" height="13" rx="6.5" fill={INK} fillOpacity="0.3" />
      <polyline
        points="150,390 240,340 330,362 420,286 510,312 600,232 690,264"
        fill="none"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [150, 390],
        [330, 362],
        [510, 312],
        [690, 264],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="8" fill={INK} />
      ))}

      {/* pulse card */}
      <rect x="770" y="120" width="330" height="150" rx="20" fill={INK} />
      <path
        d="M800 200h46l22-40 32 76 26-52 22 16h132"
        fill="none"
        stroke="#faf7f0"
        strokeOpacity="0.85"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* stat tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={770 + 0}
            y={300 + i * 56}
            width="330"
            height="44"
            rx="12"
            fill="#faf7f0"
            opacity="0.95"
          />
          <rect
            x={796}
            y={316 + i * 56}
            width={120 - i * 22}
            height="12"
            rx="6"
            fill={INK}
            fillOpacity="0.3"
          />
          <rect
            x={1010}
            y={316 + i * 56}
            width="64"
            height="12"
            rx="6"
            fill={INK}
            fillOpacity="0.55"
          />
        </g>
      ))}

      {/* exercise list */}
      <rect x="110" y="490" width="990" height="150" rx="22" fill="#faf7f0" opacity="0.9" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={178 + i * 242} cy="548" r="20" fill={INK} fillOpacity={0.7 - i * 0.14} />
          <rect
            x={212 + i * 242}
            y="540"
            width={130 - i * 10}
            height="12"
            rx="6"
            fill={INK}
            fillOpacity="0.25"
          />
          <rect
            x={212 + i * 242}
            y="564"
            width={86 - i * 8}
            height="10"
            rx="5"
            fill={INK}
            fillOpacity="0.14"
          />
        </g>
      ))}
    </Frame>
  );
}

function WebCover() {
  return (
    <Frame>
      <rect x="90" y="80" width="1020" height="600" rx="20" fill="#faf7f0" />
      {/* browser chrome */}
      <path d="M90 100a20 20 0 0 1 20-20h980a20 20 0 0 1 20 20v44H90z" fill={INK} />
      <circle cx="128" cy="112" r="7" fill="#faf7f0" fillOpacity="0.4" />
      <circle cx="152" cy="112" r="7" fill="#faf7f0" fillOpacity="0.28" />
      <circle cx="176" cy="112" r="7" fill="#faf7f0" fillOpacity="0.18" />
      <rect x="210" y="103" width="300" height="18" rx="9" fill="#faf7f0" fillOpacity="0.14" />
      {/* hero band */}
      <rect x="130" y="186" width="940" height="200" rx="14" fill={INK} fillOpacity="0.08" />
      <rect x="170" y="238" width="300" height="22" rx="11" fill={INK} fillOpacity="0.55" />
      <rect x="170" y="278" width="420" height="13" rx="6.5" fill={INK} fillOpacity="0.22" />
      <rect x="170" y="306" width="340" height="13" rx="6.5" fill={INK} fillOpacity="0.22" />
      <rect x="170" y="338" width="150" height="34" rx="17" fill={INK} fillOpacity="0.75" />
      {/* three cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={130 + i * 320}
            y="420"
            width="280"
            height="200"
            rx="14"
            fill={INK}
            fillOpacity="0.06"
          />
          <rect
            x={162 + i * 320}
            y="452"
            width="130"
            height="14"
            rx="7"
            fill={INK}
            fillOpacity="0.35"
          />
          <rect
            x={162 + i * 320}
            y="486"
            width="210"
            height="11"
            rx="5.5"
            fill={INK}
            fillOpacity="0.17"
          />
          <rect
            x={162 + i * 320}
            y="512"
            width="170"
            height="11"
            rx="5.5"
            fill={INK}
            fillOpacity="0.17"
          />
        </g>
      ))}
    </Frame>
  );
}

function PropertyCover() {
  return (
    <Frame>
      {[0, 1, 2].map((i) => {
        const x = 110 + i * 340;
        return (
          <g key={i}>
            <rect x={x} y="140" width="290" height="420" rx="20" fill="#faf7f0" />
            <rect
              x={x + 22}
              y="162"
              width="246"
              height="170"
              rx="12"
              fill={INK}
              fillOpacity={0.12 + i * 0.06}
            />
            {/* little house */}
            <g transform={`translate(${x + 145} 250)`} fill={INK} fillOpacity="0.4">
              <path d="M-52 6 0-38 52 6v2H34V48H-34V8h-18z" />
              <rect x="-12" y="14" width="24" height="34" fill="#faf7f0" fillOpacity="0.9" />
            </g>
            <rect
              x={x + 22}
              y="356"
              width={170 - i * 20}
              height="16"
              rx="8"
              fill={INK}
              fillOpacity="0.6"
            />
            <rect
              x={x + 22}
              y="392"
              width={210 - i * 24}
              height="12"
              rx="6"
              fill={INK}
              fillOpacity="0.2"
            />
            <rect
              x={x + 22}
              y="418"
              width={140 - i * 16}
              height="12"
              rx="6"
              fill={INK}
              fillOpacity="0.2"
            />
            <rect
              x={x + 22}
              y="470"
              width="120"
              height="34"
              rx="17"
              fill={INK}
              fillOpacity="0.75"
            />
          </g>
        );
      })}
    </Frame>
  );
}

const COVERS: Record<CoverKind, () => React.ReactElement> = {
  map: MapCover,
  services: ServicesCover,
  health: HealthCover,
  web: WebCover,
  property: PropertyCover,
};

export default function ProjectCover({ kind }: { kind: CoverKind }) {
  const Cover = COVERS[kind] ?? WebCover;
  return <Cover />;
}
