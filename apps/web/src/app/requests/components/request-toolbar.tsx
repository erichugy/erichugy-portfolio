type RequestToolbarProps = {
  onClear: () => void;
  onRefresh: () => void;
};

export function RequestToolbar({
  onClear,
  onRefresh,
}: RequestToolbarProps) {
  return (
    <div className="rb-toolbar">
      <h1>RequestBin</h1>
      <div className="rb-toolbar-actions">
        <button type="button" onClick={onClear}>
          Clear
        </button>
        <button type="button" onClick={onRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
}
