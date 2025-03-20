export default function AdminPageLayout({ children }) {
  return (
    <div className="size-full overflow-y-auto">
      <div className="pl-8 pr-14 py-20">
        {children}
      </div>
    </div>
  );
}