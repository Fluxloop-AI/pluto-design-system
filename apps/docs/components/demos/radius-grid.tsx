/**
 * 8단계 radius 박스 샘플 + squircle on/off 비교.
 * 글로벌 squircle 은 pds-core reset.css 에서 모든 요소에 `corner-shape: squircle` 를 건다.
 * 여기서 squircle-off 열은 `corner-shape: round` 로 강제 오버라이드.
 */

const RADII = [
  { name: "none", value: "0", cssVar: "--pds-radius-none" },
  { name: "xs", value: "2px", cssVar: "--pds-radius-xs" },
  { name: "sm", value: "4px", cssVar: "--pds-radius-sm" },
  { name: "md ★", value: "6px", cssVar: "--pds-radius-md" },
  { name: "lg", value: "8px", cssVar: "--pds-radius-lg" },
  { name: "xl", value: "12px", cssVar: "--pds-radius-xl" },
  { name: "2xl", value: "16px", cssVar: "--pds-radius-2xl" },
  { name: "full", value: "9999px", cssVar: "--pds-radius-full" },
];

export function RadiusGrid() {
  return (
    <div className="pds-radius-grid">
      {RADII.map((r) => (
        <article key={r.name} className="pds-radius-card">
          <div
            className="pds-radius-swatch"
            style={{ borderRadius: `var(${r.cssVar})` }}
            aria-hidden="true"
          />
          <div className="pds-radius-meta">
            <strong>{r.name}</strong>
            <code>{r.value}</code>
          </div>
        </article>
      ))}
      <style>{`
        .pds-radius-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
          margin: 16px 0;
        }
        .pds-radius-card {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          padding: 12px;
          border: 1px solid var(--pds-line-solid-normal);
          border-radius: var(--pds-radius-lg);
          background: var(--pds-background-normal-normal);
        }
        .pds-radius-swatch {
          aspect-ratio: 1 / 1;
          background: linear-gradient(135deg, var(--pds-color-blue-70), var(--pds-color-violet-60));
          border: 1px solid var(--pds-line-solid-normal);
        }
        .pds-radius-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 6px;
        }
        .pds-radius-meta strong {
          font-size: var(--text-label1);
          color: var(--pds-label-normal);
          font-weight: var(--pds-font-weight-semibold);
        }
        .pds-radius-meta code {
          font-family: var(--pds-font-mono);
          font-size: var(--text-caption1);
          color: var(--pds-label-alternative);
        }
      `}</style>
    </div>
  );
}

export function SquircleCompare() {
  return (
    <div className="pds-squircle-compare">
      <figure className="pds-squircle-item">
        <div className="pds-squircle-box" data-mode="on" />
        <figcaption>squircle (PDS 기본)</figcaption>
      </figure>
      <figure className="pds-squircle-item">
        <div className="pds-squircle-box" data-mode="off" />
        <figcaption>round (CSS 표준)</figcaption>
      </figure>
      <style>{`
        .pds-squircle-compare {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 16px 0;
        }
        .pds-squircle-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px;
          border: 1px solid var(--pds-line-solid-normal);
          border-radius: var(--pds-radius-lg);
          background: var(--pds-background-normal-normal);
        }
        .pds-squircle-item figcaption {
          font-size: var(--text-body2);
          color: var(--pds-label-alternative);
        }
        .pds-squircle-box {
          width: 120px;
          height: 120px;
          border-radius: 28px;
          background: linear-gradient(135deg, var(--pds-primary-normal), var(--pds-color-violet-60));
          -electron-corner-smoothing: var(--pds-corner-smoothing);
        }
        .pds-squircle-box[data-mode="off"] {
          corner-shape: round;
          -electron-corner-smoothing: 0;
        }
      `}</style>
    </div>
  );
}
