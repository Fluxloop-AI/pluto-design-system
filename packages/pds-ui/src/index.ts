/**
 * @fluxloop-ai/pds-ui — 소스 노출형 컴포넌트 패키지.
 *
 * 1차 소비 경로: shadcn CLI 로 앱 레포에 파일 복사.
 *   npx shadcn add https://pds.pluto.com/r/separator
 *
 * 2차 소비 경로: 워크스페이스 내부(docs 앱, 동 모노레포 앱)에서는 소스 import.
 *   import { Separator } from "@fluxloop-ai/pds-ui/components/separator";
 */

export type { AvatarProps } from "./components/avatar";
export { Avatar, avatar } from "./components/avatar";
export type { ButtonProps } from "./components/button";
export { Button, button } from "./components/button";
export type { DialogContentProps } from "./components/dialog";
export {
  Dialog,
  DialogActionArea,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogNavigation,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/dropdown-menu";
export type { IconProps } from "./components/icon";
export { Icon, icon } from "./components/icon";
export type { InputProps } from "./components/input";
export { Input, input } from "./components/input";
export type { ScrollAreaProps } from "./components/scroll-area";
export { ScrollArea, ScrollBar } from "./components/scroll-area";
export type { SeparatorProps } from "./components/separator";
export { Separator, separator } from "./components/separator";
export type { ToastRootProps } from "./components/toast";
export {
  Toast,
  ToastAction,
  ToastProvider,
  ToastViewport,
} from "./components/toast";
export type { TooltipContentProps, TooltipProps } from "./components/tooltip";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  tooltip,
} from "./components/tooltip";
export { cn } from "./utils/cn";
