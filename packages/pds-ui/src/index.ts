/**
 * @fluxloop-ai/pds-ui — 소스 노출형 컴포넌트 패키지.
 *
 * 1차 소비 경로: shadcn CLI 로 앱 레포에 파일 복사.
 *   npx shadcn add https://pds.pluto.com/r/separator
 *
 * 2차 소비 경로: 워크스페이스 내부(docs 앱, 동 모노레포 앱)에서는 소스 import.
 *   import { Separator } from "@fluxloop-ai/pds-ui/components/separator";
 */
export { Separator, separator } from "./components/separator";
export type { SeparatorProps } from "./components/separator";
export { Avatar, avatar } from "./components/avatar";
export type { AvatarProps } from "./components/avatar";
export { Icon, icon } from "./components/icon";
export type { IconProps } from "./components/icon";
export { Button, button } from "./components/button";
export type { ButtonProps } from "./components/button";
export { Input, input } from "./components/input";
export type { InputProps } from "./components/input";
export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  tooltip,
} from "./components/tooltip";
export type { TooltipContentProps, TooltipProps } from "./components/tooltip";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./components/dropdown-menu";
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogNavigation,
  DialogBody,
  DialogActionArea,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./components/dialog";
export type { DialogContentProps } from "./components/dialog";
export {
  Toast,
  ToastAction,
  ToastProvider,
  ToastViewport,
} from "./components/toast";
export type { ToastRootProps } from "./components/toast";
export { ScrollArea, ScrollBar } from "./components/scroll-area";
export type { ScrollAreaProps } from "./components/scroll-area";
export { cn } from "./utils/cn";
