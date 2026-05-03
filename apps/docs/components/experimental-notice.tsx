import { Callout } from "fumadocs-ui/components/callout";

type Props = {
  area: string;
};

export function ExperimentalNotice({ area }: Props) {
  return (
    <Callout type="warn" title={`Experimental — ${area}`}>
      이 컴포넌트는 <strong>{area}</strong> 영역의 일부로, 1.0 이후 재설계가 예정되어 있습니다.
      Breaking change가 잦을 수 있으므로 프로덕션 채택 전 변경 이력을 확인해 주세요.
    </Callout>
  );
}
