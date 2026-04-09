import type { CapturedRequest } from "@/tools/request-bin/types";
import { formatTime } from "@/utils/format";

type RequestListPanelProps = {
  onSelectRequest: (index: number) => void;
  requests: CapturedRequest[];
  selectedIndex: number;
  width: number;
};

export function RequestListPanel({
  onSelectRequest,
  requests,
  selectedIndex,
  width,
}: RequestListPanelProps) {
  return (
    <div className="rb-list-panel" style={{ width }}>
      {requests.length === 0 ? (
        <div className="rb-empty">No requests yet</div>
      ) : (
        requests.map((request, index) => (
          <button
            key={request.id}
            type="button"
            className={`rb-list-item${index === selectedIndex ? " rb-selected" : ""}`}
            aria-pressed={index === selectedIndex}
            onClick={() => onSelectRequest(index)}
          >
            <span className={`rb-method rb-method-${request.method.toLowerCase()}`}>
              {request.method}
            </span>
            <span className="rb-path">{request.path}</span>
            <span className="rb-time">{formatTime(request.timestamp)}</span>
          </button>
        ))
      )}
    </div>
  );
}
