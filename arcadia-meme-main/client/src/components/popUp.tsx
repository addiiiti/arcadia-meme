import { useEffect, useState } from "react";
interface PopupMessageProps {
  type: "error" | "warning" | "info";
  message: string;
  image?: string; // Optional image URL
  onDismiss?: () => void;
}

export const PopupMessage: React.FC<PopupMessageProps> = ({
  type,
  message,
  image,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 5000); // Auto-dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  const typeStyles = {
    error: "bg-red-600 border-red-700",
    warning: "bg-yellow-600 border-yellow-700",
    info: "bg-green-600 border-green-700",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white flex items-center space-x-4 ${typeStyles[type]}`}
    >
      {image && (
        <img
          src={image}
          alt="Notification Graphic"
          className="w-12 h-12 rounded-full"
        />
      )}
      <div>
        <div className="flex items-center">
          <img src="/arcadia-meme.gif" alt="Arcadia Meme" className="w-10" />
          <p className="text-sm mx-2">{message}</p>
          <img src="/arcadia-meme.gif" alt="Arcadia Meme" className="w-10" />
        </div>

        <button
          className="mt-2 text-xs underline text-gray-200 hover:text-white"
          onClick={() => {
            setIsVisible(false);
            onDismiss?.();
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
