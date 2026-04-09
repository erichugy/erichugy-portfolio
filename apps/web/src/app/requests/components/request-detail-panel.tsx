import { FiDownload } from "react-icons/fi";

import type { CapturedRequest } from "@/tools/request-bin/types";
import { syntaxHighlightJson } from "@/utils/html";

import type { CollapsedSections } from "../requests-page.types";
import { CollapsibleSection } from "./collapsible-section";

type RequestDetailPanelProps = {
  collapsed: CollapsedSections;
  onDownloadRequest: (request: CapturedRequest) => void;
  onToggleCollapse: (section: keyof CollapsedSections) => void;
  selectedRequest: CapturedRequest | null;
};

export function RequestDetailPanel({
  collapsed,
  onDownloadRequest,
  onToggleCollapse,
  selectedRequest,
}: RequestDetailPanelProps) {
  return (
    <div className="rb-detail-panel">
      {selectedRequest ? (
        <>
          <div className="rb-detail-header">
            <div className="rb-detail-summary">
              <div className="rb-detail-title">
                <span
                  className={`rb-method rb-method-${selectedRequest.method.toLowerCase()}`}
                >
                  {selectedRequest.method}
                </span>
                <span className="rb-path">{selectedRequest.path}</span>
              </div>
              <div className="rb-detail-meta">
                {selectedRequest.timestamp} &middot; ID: {selectedRequest.id}
              </div>
            </div>
            <div className="rb-detail-actions">
              <button
                type="button"
                className="rb-detail-action"
                onClick={() => onDownloadRequest(selectedRequest)}
                aria-label="Download request JSON"
                title="Download request JSON"
              >
                <FiDownload aria-hidden="true" />
              </button>
            </div>
          </div>
          <CollapsibleSection
            title="Body"
            collapsed={collapsed.body}
            onToggle={() => onToggleCollapse("body")}
          >
            <pre
              dangerouslySetInnerHTML={{
                __html: syntaxHighlightJson(selectedRequest.body),
              }}
            />
          </CollapsibleSection>
          <CollapsibleSection
            title="Headers"
            collapsed={collapsed.headers}
            onToggle={() => onToggleCollapse("headers")}
          >
            <pre
              dangerouslySetInnerHTML={{
                __html: syntaxHighlightJson(selectedRequest.headers),
              }}
            />
          </CollapsibleSection>
          <CollapsibleSection
            title="Query Parameters"
            collapsed={collapsed.query}
            onToggle={() => onToggleCollapse("query")}
          >
            <pre
              dangerouslySetInnerHTML={{
                __html: syntaxHighlightJson(selectedRequest.query),
              }}
            />
          </CollapsibleSection>
        </>
      ) : (
        <div className="rb-placeholder">Select a request to view details</div>
      )}
    </div>
  );
}
