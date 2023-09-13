export default function Calendar({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      class={className}
    >
      <path
        fill="currentColor"
        d="M5.248 8.997a.748.748 0 1 0 0-1.497a.748.748 0 0 0 0 1.497Zm.749 1.752a.748.748 0 1 1-1.497 0a.748.748 0 0 1 1.497 0ZM8 8.996A.748.748 0 1 0 8 7.5a.748.748 0 0 0 0 1.497Zm.749 1.752a.748.748 0 1 1-1.497 0a.748.748 0 0 1 1.497 0Zm2-1.752a.748.748 0 1 0 0-1.497a.748.748 0 0 0 0 1.497ZM14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7ZM3 6h10v5.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5V6Zm1.5-3h7A1.5 1.5 0 0 1 13 4.5V5H3v-.5A1.5 1.5 0 0 1 4.5 3Z"
      />
    </svg>
  );
}
