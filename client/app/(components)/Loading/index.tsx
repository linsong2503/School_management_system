import "@/app/(components)/Loading/style.css";
interface LoadingProps {
  color?: string;
  size?: "small" | "medium" | "large";
}

export default function LoadingSpinner({ color = "red", size="medium" }: LoadingProps) {
  return (
    <>
      <div
        className={`loading-spinner loading-spinner--${size}`}
        style={{ borderTopColor: color }}
      />
    </>
  );
}
