"use client";

import { Button } from "@fluxloop-ai/pds-ui/components/button";
import { Icon } from "@fluxloop-ai/pds-ui/components/icon";
import { ArrowRight, Plus, Trash } from "@fluxloop-ai/pds-icons/icons";
import { useState } from "react";

export function ButtonVariantDemo() {
  return (
    <div className="pds-btn-card">
      <div className="pds-btn-row">
        <Button variant="solid">Solid</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="pds-btn-row">
        <Button variant="solid" disabled>Solid</Button>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="danger" disabled>Danger</Button>
      </div>
      <Styles />
    </div>
  );
}

export function ButtonSizeDemo() {
  return (
    <div className="pds-btn-card">
      <div className="pds-btn-row">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <Styles />
    </div>
  );
}

export function ButtonWithIconDemo() {
  return (
    <div className="pds-btn-card">
      <div className="pds-btn-row">
        <Button leadingContent={<Icon icon={Plus} />}>새로 만들기</Button>
        <Button variant="secondary" trailingContent={<Icon icon={ArrowRight} />}>
          다음
        </Button>
        <Button variant="ghost" trailingContent={<Icon icon={ArrowRight} />}>
          더 보기
        </Button>
        <Button variant="danger" leadingContent={<Icon icon={Trash} />}>
          삭제
        </Button>
      </div>
      <div className="pds-btn-row">
        <Button iconOnly size="xs" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="sm" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="md" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="lg" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
      </div>
      <div className="pds-btn-row">
        <Button iconOnly size="xs" variant="secondary" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="sm" variant="secondary" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="md" variant="secondary" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="lg" variant="secondary" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
      </div>
      <div className="pds-btn-row">
        <Button iconOnly size="xs" variant="ghost" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="sm" variant="ghost" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="md" variant="ghost" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
        <Button iconOnly size="lg" variant="ghost" aria-label="추가">
          <Icon icon={Plus} />
        </Button>
      </div>
      <Styles />
    </div>
  );
}

export function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="pds-btn-card">
      <div className="pds-btn-row">
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          }}
        >
          저장
        </Button>
        <Button variant="secondary" loading>로딩 중</Button>
        <Button variant="ghost" loading>로딩 중</Button>
      </div>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-btn-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
      .pds-btn-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }
    `}</style>
  );
}
