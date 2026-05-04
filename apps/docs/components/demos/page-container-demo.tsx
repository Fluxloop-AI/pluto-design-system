"use client";

import { PageContainer } from "@fluxloop-ai/pds-ui/components/page-container";

export function PageContainerBasicDemo() {
  return (
    <ParentFrame>
      <PageContainer>
        <Placeholder label="PageContainer (default · 960px)" />
      </PageContainer>
    </ParentFrame>
  );
}

export function PageContainerVariantsDemo() {
  return (
    <div className="flex flex-col gap-[16px]">
      <ParentFrame>
        <PageContainer variant="narrow">
          <Placeholder label="narrow · 720px" />
        </PageContainer>
      </ParentFrame>
      <ParentFrame>
        <PageContainer variant="default">
          <Placeholder label="default · 960px" />
        </PageContainer>
      </ParentFrame>
      <ParentFrame>
        <PageContainer variant="wide">
          <Placeholder label="wide · 1200px" />
        </PageContainer>
      </ParentFrame>
      <ParentFrame>
        <PageContainer variant="full">
          <Placeholder label="full · max-width 없음 (gutter 32 유지)" />
        </PageContainer>
      </ParentFrame>
    </div>
  );
}

export function PageContainerWithContentDemo() {
  return (
    <ParentFrame>
      <PageContainer>
        <h1
          style={{
            margin: 0,
            font: "var(--pds-font-title2-bold)",
            color: "var(--pds-label-strong)",
          }}
        >
          페이지 제목
        </h1>
        <p
          style={{
            marginTop: 8,
            font: "var(--pds-font-body1-regular)",
            color: "var(--pds-label-neutral)",
          }}
        >
          PageContainer 는 max-width · 좌우 gutter · 상하 padding 만 책임지는 wrapper. 첫 자식이
          헤더든 본문이든 동일하게 frame 이 적용된다.
        </p>
        <div
          style={{
            marginTop: 24,
            height: 240,
            borderRadius: "var(--pds-radius-12)",
            background: "var(--pds-fill-normal)",
          }}
        />
      </PageContainer>
    </ParentFrame>
  );
}

/**
 * 부모(예: AppShellMainBody) 를 시각적으로 표현하는 프레임.
 * PageContainer 의 max-width 가 부모 안에서 어디까지 차지하는지 확인용.
 */
function ParentFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: "16px 0",
        borderRadius: "var(--pds-radius-12)",
        border: "1px solid var(--pds-line-solid-normal)",
        background: "var(--pds-background-normal-alternative)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 120,
        borderRadius: "var(--pds-radius-12)",
        border: "1px dashed var(--pds-line-solid-normal)",
        background: "var(--pds-background-normal-normal)",
        color: "var(--pds-label-neutral)",
        font: "var(--pds-font-label1-regular)",
      }}
    >
      {label}
    </div>
  );
}
