// Decorative SVG illustration of a glowing Ethereum diamond,
// used as a hero graphic across pages.
function EthIllustration({ size = 220 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            style={{ filter: "drop-shadow(0 0 30px rgba(168,85,247,0.45))" }}
        >
            <defs>
                <linearGradient id="ethGradTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="ethGradBottom" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx="100" cy="100" r="95" fill="url(#glow)" />

            {/* top facets */}
            <polygon points="100,20 60,95 100,75" fill="url(#ethGradTop)" opacity="0.95" />
            <polygon points="100,20 140,95 100,75" fill="url(#ethGradTop)" opacity="0.7" />

            {/* bottom facets */}
            <polygon points="60,105 100,180 100,85" fill="url(#ethGradBottom)" opacity="0.95" />
            <polygon points="140,105 100,180 100,85" fill="url(#ethGradBottom)" opacity="0.75" />

            {/* outline strokes */}
            <polygon points="100,20 60,95 100,75 140,95" fill="none" stroke="#ede9fe" strokeOpacity="0.5" strokeWidth="1" />
            <polygon points="60,105 100,180 140,105 100,85" fill="none" stroke="#ede9fe" strokeOpacity="0.4" strokeWidth="1" />
        </svg>
    );
}

export default EthIllustration;