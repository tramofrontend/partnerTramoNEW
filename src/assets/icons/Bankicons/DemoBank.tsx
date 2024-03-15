import React from "react";
import type { SVGProps } from "react";

export function DemoBank(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 128 128"
      cursor={"pointer"}
      {...props}
    >
      <path fill="#fff" d="M17.21 10.09h95.93v35.72H17.21z"></path>
      <path fill="#006ca2" d="M17.21 46.81h95.93V128H17.21z"></path>
      <g fill="#78a3ad">
        <path d="M29.59 30.83c-.92 0-1.71.05-1.71 1.36c0 .64-.03 1.27.01 1.91c.01.35.06.74.23 1.04c.18.31.39.31.68.35c.38.06.7.07 1.09.07c.89 0 1.8-.57 2.12-1.47c.16-.48.17-1.04-.07-1.67c-.42-1.02-1.45-1.59-2.35-1.59m23.99-1.6l-.03-.13c-.18-.74-.35-1.48-.52-2.22c-.13-.25-.22-.61-.55-.52c-.23.06-.32.35-.38.51l-.07.08c-.16 1.02-.34 2.04-.53 3.06l-.02.11l-.06.25c-.03.3-.07.63.03.92l.24.3l.39.13l.27.1h.93c1.13-.33.44-1.71.33-2.5zm-24.76-4.24c.89.18 2.05-.13 2.57-1.15c.38-.75.31-1.64-.14-2.31l-.16-.22c-.36-.41-.88-.52-1.35-.54c-.47-.03-1.01 0-1.45.23l-.22.25c-.12.23-.22.54-.27.87c-.13.79-.03 1.74.28 2.32c.17.31.43.49.74.55"></path>
        <path d="M110.16 2.78H17.84c-5.08 0-9.24 4.16-9.24 9.24V128h39.92v-19.62c0-2.83 2.31-5.15 5.14-5.15h20.65c2.83 0 5.15 2.32 5.15 5.15V128h39.92V12.02c.02-5.08-4.14-9.24-9.22-9.24M35.39 91.64H22.38v-15.7h13.01zm0-24.02H22.38v-15.7h13.01zm3.74-31.96c-.83 1.96-2.3 3.65-4.18 4.46c-2.22.96-4.62 1.07-6.98 1.01c-1.34-.03-3.16.07-4.31-.75c-2.21-1.59-1.81-3.81-1.84-6.25c-.03-2.18-.03-4.36-.1-6.53c-.06-2.01-.03-3.97.01-5.94c.03-1.45-.36-3.37.64-4.57c1.67-2.02 4.85-2.07 7.2-1.89c3.83.3 8.54 2.19 8.03 7.28c-.09.75-.32 1.54-.7 2.16c-.4.66-1.23 1.45-.84 2.36c.45 1.03 1.81 1.59 2.43 2.59c.75 1.22 1.1 2.41 1.12 3.53c.02.88-.15 1.75-.48 2.54m19.56 55.98H45.68v-15.7h13.01zm0-24.02H45.68v-15.7h13.01zm1.03-26.59c-1.11.28-3.31.05-3.82-1.15c-.71-1.68-.38-3.63-2.77-3.94c-1.12-.15-2.74.34-3.21 1.45c-.48 1.16-.1 2.59-1.34 3.38c-.84.54-2.02.62-2.99.46c-2.18-.35-2.7-1.96-2.38-3.96c.16-.97.37-1.94.62-2.9c.48-1.95 1.08-3.88 1.52-5.83c.46-2.04.8-4.1 1.36-6.13c.98-3.61 2.77-8.37 7.53-6.77c2.04.68 2.61 2.94 3.27 4.74c.96 2.6 1.34 5.46 1.94 8.16c.44 1.95 1.03 3.88 1.52 5.83c.28 1.16.83 2.9.67 4.33c-.12 1.1-.63 1.99-1.92 2.33m22.27 50.61H68.98v-15.7h13.01zm0-24.02H68.98v-15.7h13.01zm3.32-33.84c-.02.77-.06 1.68-.19 2.59c-.19 1.41-.73 3.8-2.48 3.97c-.57.06-1.19.01-1.69-.14c-2.79-.82-3.27-3.83-4.93-5.89c-.43-.53-.73-1.09-1.06-1.66c-.38-.65-1.14-1.93-2-2.04c-1.06-.14-.82 1.34-.81 2.07c.03 2.2.76 6.89-1.78 8c-3.77 1.65-4.71-3.47-4.77-5.81c-.08-2.92-.41-5.84-.41-8.76c0-2.28-.25-7.12 1.75-8.77c3.24-2.67 5.18.13 7.24 2.52c.94 1.1 1.55 2.23 2.34 3.44c.47.72 1.71 1.5 2.09.34c.64-1.9-.03-4.28.97-6.04c1.23-2.15 4.74-1.58 5.66.57c.17.39.22 1.05.27 1.5c.54 4.65-.12 9.42-.2 14.11m19.99 57.86H92.28v-15.7h13.02zm0-24.02H92.28v-15.7h13.02zm2.09-28.65c-.57 1.24-2.2 2.47-3.59 1.95c-1.58-.59-2.37-2.2-2.97-3.67c-.57-1.42-1.25-2.94-2.55-3.87c-.66-.48-1.21-.22-1.66.28c-1.79 1.95 1.11 5.95-1.87 7.26c-.7.3-1.71.27-2.46.19c-3.63-.38-2.87-4.04-2.89-6.72c-.02-2.3-.02-4.58-.1-6.83c-.07-2.06-.03-4.04.02-6.01c.01-.84.07-1.54.17-2.37c.12-1.05.03-2.26 1.06-2.95c.96-.64 2.31-.48 3.36-.2c1.38.37 1.38.9 1.84 2.21c.34.99.38 2.14.4 3.19c.02.62.13 1.48.9 1.49c.79 0 1.46-1.34 1.91-1.86c.43-.51.92-.97 1.18-1.58c.91-2.06 3.85-4.03 5.94-2.09c1.81 1.67.42 4-.8 5.55c-1.11 1.42-3.06 2.99-2.35 5.01c.86 2.48 2.69 4.63 3.74 7.04c.33.74.81 1.76.91 2.71c.02.44-.01.88-.19 1.27"></path>
      </g>
    </svg>
  );
}
