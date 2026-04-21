"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fluxloop-ai/pds-ui/components/tabs";

export function TabsHorizontalDemo() {
  return (
    <div className="pds-demo-row">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="members">멤버</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
          <TabsTrigger value="billing" disabled>
            결제 (비활성)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" style={{ padding: 12, fontSize: 13 }}>
          프로젝트 개요 탭. Arrow 키로 이동, 기본 activation=automatic.
        </TabsContent>
        <TabsContent value="members" style={{ padding: 12, fontSize: 13 }}>
          멤버 목록 탭.
        </TabsContent>
        <TabsContent value="settings" style={{ padding: 12, fontSize: 13 }}>
          설정 탭.
        </TabsContent>
      </Tabs>
      <Styles />
    </div>
  );
}

export function TabsSizeDemo() {
  return (
    <div className="pds-demo-row" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s}>
          <div
            style={{
              fontSize: 11,
              color: "var(--pds-label-alternative)",
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {s}
          </div>
          <Tabs defaultValue="a" size={s}>
            <TabsList>
              <TabsTrigger value="a">첫 번째</TabsTrigger>
              <TabsTrigger value="b">두 번째</TabsTrigger>
              <TabsTrigger value="c">세 번째</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      ))}
      <Styles />
    </div>
  );
}

export function TabsFillDemo() {
  return (
    <div className="pds-demo-row">
      <Tabs defaultValue="a" resize="fill">
        <TabsList>
          <TabsTrigger value="a">Fill</TabsTrigger>
          <TabsTrigger value="b">같은</TabsTrigger>
          <TabsTrigger value="c">폭</TabsTrigger>
        </TabsList>
      </Tabs>
      <Styles />
    </div>
  );
}

export function TabsVerticalDemo() {
  return (
    <div className="pds-demo-row">
      <Tabs defaultValue="a" orientation="vertical" size="sm">
        <TabsList>
          <TabsTrigger value="a">일반</TabsTrigger>
          <TabsTrigger value="b">알림</TabsTrigger>
          <TabsTrigger value="c">통합</TabsTrigger>
        </TabsList>
        <TabsContent value="a" style={{ padding: "0 16px", fontSize: 13 }}>
          일반 설정
        </TabsContent>
        <TabsContent value="b" style={{ padding: "0 16px", fontSize: 13 }}>
          알림 설정
        </TabsContent>
        <TabsContent value="c" style={{ padding: "0 16px", fontSize: 13 }}>
          통합 설정
        </TabsContent>
      </Tabs>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-demo-row {
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
