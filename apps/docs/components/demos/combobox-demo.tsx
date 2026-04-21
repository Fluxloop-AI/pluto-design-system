"use client";

import { MagnifyingGlass } from "@fluxloop-ai/pds-icons/icons";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@fluxloop-ai/pds-ui/components/combobox";
import * as React from "react";

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "angular", label: "Angular" },
  { value: "qwik", label: "Qwik" },
];

export function ComboboxBasicDemo() {
  const [value, setValue] = React.useState<string>("react");
  const selectedLabel = FRAMEWORKS.find((f) => f.value === value)?.label ?? value;
  return (
    <div className="pds-demo-row" style={{ width: 280 }}>
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger placeholder="프레임워크 선택">{selectedLabel}</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="검색" leadingContent={<MagnifyingGlass />} />
          <ComboboxList>
            <ComboboxEmpty>일치하는 항목이 없습니다.</ComboboxEmpty>
            {FRAMEWORKS.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Styles />
    </div>
  );
}

const CITIES = [
  { group: "KR", items: ["Seoul", "Busan", "Jeju"] },
  { group: "US", items: ["New York", "San Francisco", "Austin"] },
];

export function ComboboxGroupDemo() {
  return (
    <div className="pds-demo-row" style={{ width: 280 }}>
      <Combobox size="md" defaultValue="Seoul">
        <ComboboxTrigger>Seoul</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="도시 검색 (한/영)" leadingContent={<MagnifyingGlass />} />
          <ComboboxList>
            <ComboboxEmpty>일치 없음</ComboboxEmpty>
            {CITIES.map((g, idx) => (
              <React.Fragment key={g.group}>
                {idx > 0 ? <ComboboxSeparator /> : null}
                <ComboboxGroup heading={g.group}>
                  {g.items.map((c) => (
                    <ComboboxItem key={c} value={c}>
                      {c}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              </React.Fragment>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Styles />
    </div>
  );
}

export function ComboboxDisabledDemo() {
  return (
    <div className="pds-demo-row" style={{ width: 280 }}>
      <Combobox disabled defaultValue="react">
        <ComboboxTrigger>React (disabled)</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxList>
            {FRAMEWORKS.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
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
