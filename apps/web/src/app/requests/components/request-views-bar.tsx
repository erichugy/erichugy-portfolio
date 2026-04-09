import {
  type ChangeEvent,
  type RefObject,
  useRef,
} from "react";

import type { SavedView } from "../requests-page.types";

type RequestViewsBarProps = {
  activeViewId: string;
  onDeleteView: (viewId: string) => void;
  onExportView: (viewId: string) => void;
  onImportViews: (file: File) => void;
  onRenameView: (viewId: string) => void;
  onSaveView: () => void;
  onSwitchView: (viewId: string) => void;
  onToggleContextMenu: (viewId: string) => void;
  savedViews: SavedView[];
  tabContextMenuId: string | null;
  tabContextMenuRef: RefObject<HTMLSpanElement | null>;
};

export function RequestViewsBar({
  activeViewId,
  onDeleteView,
  onExportView,
  onImportViews,
  onRenameView,
  onSaveView,
  onSwitchView,
  onToggleContextMenu,
  savedViews,
  tabContextMenuId,
  tabContextMenuRef,
}: RequestViewsBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onImportViews(file);
    }

    event.target.value = "";
  };

  return (
    <div className="rb-view-tabs">
      <button
        type="button"
        className={`rb-view-tab${activeViewId === "default" ? " rb-active" : ""}`}
        onClick={() => onSwitchView("default")}
      >
        All requests
      </button>
      {savedViews.map((view) => (
        <span
          key={view.id}
          className="rb-view-tab-ctx"
          ref={tabContextMenuId === view.id ? tabContextMenuRef : undefined}
        >
          <span className="rb-view-tab-group">
            <button
              type="button"
              className={`rb-view-tab${activeViewId === view.id ? " rb-active" : ""}`}
              onClick={() => onSwitchView(view.id)}
              onContextMenu={(event) => {
                event.preventDefault();
                onToggleContextMenu(view.id);
              }}
            >
              {view.name}
            </button>
            <button
              type="button"
              className="rb-view-tab-menu-button"
              aria-label={`Open actions for ${view.name}`}
              aria-haspopup="menu"
              aria-expanded={tabContextMenuId === view.id}
              onClick={() => onToggleContextMenu(view.id)}
            >
              ⋯
            </button>
          </span>
          {tabContextMenuId === view.id && (
            <div className="rb-tab-context-menu">
              <button type="button" onClick={() => onRenameView(view.id)}>
                Rename
              </button>
              <button
                type="button"
                className="rb-danger"
                onClick={() => onDeleteView(view.id)}
              >
                Delete
              </button>
              <button type="button" onClick={() => onExportView(view.id)}>
                Export
              </button>
            </div>
          )}
        </span>
      ))}
      <button
        type="button"
        className="rb-view-add"
        onClick={onSaveView}
        title="Save current filters as a view"
      >
        +
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="rb-hidden-file-input"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="rb-view-add rb-view-import-button"
        onClick={() => fileInputRef.current?.click()}
        title="Import views"
      >
        Import
      </button>
    </div>
  );
}
