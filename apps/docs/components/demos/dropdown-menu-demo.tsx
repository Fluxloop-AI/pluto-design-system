"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@fluxloop-ai/pds-ui/components/dropdown-menu";
import { Button } from "@fluxloop-ai/pds-ui/components/button";

export function DropdownBasicDemo() {
  return (
    <div className="pds-dd-card">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>프로젝트</DropdownMenuLabel>
          <DropdownMenuItem>
            새로 만들기
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            복제
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>공유</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>링크 복사</DropdownMenuItem>
              <DropdownMenuItem>이메일</DropdownMenuItem>
              <DropdownMenuItem>슬랙</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

export function DropdownCheckDemo() {
  const [panel, setPanel] = useState(true);
  const [ruler, setRuler] = useState(false);
  return (
    <div className="pds-dd-card">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">보기 옵션</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>보기</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={panel} onCheckedChange={setPanel}>
            사이드 패널
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={ruler} onCheckedChange={setRuler}>
            룰러 표시
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

export function DropdownRadioDemo() {
  const [pos, setPos] = useState("bottom");
  return (
    <div className="pds-dd-card">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">패널 위치: {pos}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>패널 위치</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={pos} onValueChange={setPos}>
            <DropdownMenuRadioItem value="top">상단</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">하단</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">우측</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Styles />
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      .pds-dd-card {
        padding: 24px;
        margin: 16px 0;
        border: 1px solid var(--pds-line-solid-normal);
        border-radius: var(--pds-radius-lg);
        background: var(--pds-background-normal-normal);
      }
    `}</style>
  );
}
