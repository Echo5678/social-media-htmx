const NotificationIcon = ({
  className,
  notification_count,
}: {
  className?: string;
  notification_count?: number;
}) => {
  return (
    <div class="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        class={className}
      >
        <path
          fill="currentColor"
          d="M16 4a9 9 0 0 0-9 9v4.803l-1.929 4.826A1 1 0 0 0 6 24h6c0 2.217 1.783 4 4 4s4-1.783 4-4h6a1 1 0 0 0 .929-1.371L25 17.803V13a9 9 0 0 0-9-9Zm2 20c0 1.112-.888 2-2 2s-2-.888-2-2h4ZM9 13a7 7 0 1 1 14 0v4.995a1 1 0 0 0 .071.371L24.523 22H7.477l1.452-3.634a1 1 0 0 0 .071-.37V13Z"
        />
      </svg>
      {notification_count && (
        <span class="flex h-[7px] w-[7px] absolute top-0 right-1">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-[7px] w-[7px] bg-sky-500"></span>
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
