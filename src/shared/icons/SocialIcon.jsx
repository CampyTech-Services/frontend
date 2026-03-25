export function SocialIcon({ platform, className = "" }) {
  const iconProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (platform) {
    case "facebook":
      return (
        <svg {...iconProps}>
          <path
            d="M14.5 4H17V1h-2.9C10.9 1 9 2.9 9 6v2H6v4h3v11h4V12h3.2l.8-4H13V6.2c0-.9.6-1.2 1.5-1.2Z"
            fill="currentColor"
          />
        </svg>
      );

    case "tiktok":
      return (
        <svg {...iconProps}>
          <path
            d="M14.9 3c.3 2 1.6 3.7 3.8 4.3v3a7.1 7.1 0 0 1-3.8-1.1v5.9a4.9 4.9 0 1 1-4.1-4.8v3a1.9 1.9 0 1 0 1.2 1.8V3h2.9Z"
            fill="currentColor"
          />
          <path
            d="M14.2 5.1c.7 1.4 1.9 2.4 3.5 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      );

    case "whatsapp":
      return (
        <svg {...iconProps}>
          <path
            d="M12 3.2a8.8 8.8 0 0 0-7.6 13.3L3 21l4.7-1.2A8.8 8.8 0 1 0 12 3.2Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M12 4.5a7.5 7.5 0 0 0-6.4 11.4l-.9 3 3-.8A7.5 7.5 0 1 0 12 4.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9.3 8.9c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.6 1.5c.1.3.1.5-.1.7l-.5.6c-.1.1-.2.3 0 .6.5.9 1.2 1.6 2.1 2.1.3.2.4.1.6 0l.7-.5c.2-.2.4-.2.7-.1l1.4.6c.4.2.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .4-1.7.3-.9-.1-2-.5-3.4-1.8-1.5-1.3-2-2.6-2.1-3.5-.1-.6.1-1.2.3-1.6Z"
            fill="currentColor"
          />
        </svg>
      );

    case "instagram":
      return (
        <svg {...iconProps}>
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="12"
            r="3.6"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="17" cy="7.2" r="1.1" fill="currentColor" />
        </svg>
      );

    default:
      return null;
  }
}
