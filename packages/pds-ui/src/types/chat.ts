/**
 * Anthropic Messages API 호환 콘텐츠 블록 타입.
 * PDS chat 컴포넌트들의 1차 계약. 앱/어댑터는 이 타입만 맞추면 된다.
 */

export type TextBlock = {
  type: "text";
  text: string;
};

export type ThinkingBlock = {
  type: "thinking";
  thinking: string;
  signature?: string;
};

export type ToolUseBlock = {
  type: "tool_use";
  id: string;
  name: string;
  input: unknown;
};

export type ToolResultBlock = {
  type: "tool_result";
  tool_use_id: string;
  content: unknown;
  is_error?: boolean;
};

export type ImageBlockSource =
  | { type: "base64"; media_type: string; data: string }
  | { type: "url"; url: string };

export type ImageBlock = {
  type: "image";
  source: ImageBlockSource;
};

export type ContentBlock = TextBlock | ThinkingBlock | ToolUseBlock | ToolResultBlock | ImageBlock;

export type ChatMessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string | ContentBlock[];
};

export type ChatStatusPhase = "pending" | "running" | "complete" | "error" | "requires-action";

export type ChatAgentStatus =
  | "speculating"
  | "thinking"
  | "tool_executing"
  | "generating"
  | "compacting";
