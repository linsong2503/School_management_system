/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  ExportCsv,
  ExportPrint,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
  QuickFilterTrigger,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { useGetTeachersQuery } from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Class, Lesson, Subject } from "@prisma/client";
import UserActions from "@/app/(components)/Users/UserActions";
import LoadingSpinner from "@/app/(components)/Loading";
import NotFound from "@/app/(components)/Error";
import TableHeader from "@/app/(components)/TableHeader";

type OwnerState = {
  expanded: boolean;
};

const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "center",
});

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: "1 / 1",
    width: "min-content",
    height: "min-content",
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? "none" : "auto",
    transition: theme.transitions.create(["opacity"]),
  })
);

const StyledTextField = styled(TextField)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  overflowX: "clip",
  width: ownerState.expanded ? 260 : "var(--trigger-width)",
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"]),
}));

function CustomToolbar() {
  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
  const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Toolbar>
      <Tooltip title="Columns">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumnIcon fontSize="small" />
        </ColumnsPanelTrigger>
      </Tooltip>

      <Tooltip title="Filters">
        <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge
                badgeContent={state.filterCount}
                color="primary"
                variant="dot"
              >
                <FilterListIcon fontSize="small" />
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ mx: 0.5 }}
      />

      <Tooltip title="Export">
        <ToolbarButton
          ref={exportMenuTriggerRef}
          id="export-menu-trigger"
          aria-controls="export-menu"
          aria-haspopup="true"
          aria-expanded={exportMenuOpen ? "true" : undefined}
          onClick={() => setExportMenuOpen(true)}
        >
          <FileDownloadIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>

      <Menu
        id="export-menu"
        anchorEl={exportMenuTriggerRef.current}
        open={exportMenuOpen}
        onClose={() => setExportMenuOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          list: {
            "aria-labelledby": "export-menu-trigger",
          },
        }}
      >
        <ExportPrint
          render={<MenuItem />}
          onClick={() => setExportMenuOpen(false)}
        >
          Print
        </ExportPrint>
        <ExportCsv
          render={<MenuItem />}
          onClick={() => setExportMenuOpen(false)}
        >
          Download as CSV
        </ExportCsv>
      </Menu>

      <StyledQuickFilter>
        <QuickFilterTrigger
          render={(triggerProps, state) => (
            <Tooltip title="Search" enterDelay={0}>
              <StyledToolbarButton
                {...triggerProps}
                ownerState={{ expanded: state.expanded }}
                color="default"
                aria-disabled={state.expanded}
              >
                <SearchIcon fontSize="small" />
              </StyledToolbarButton>
            </Tooltip>
          )}
        />
        <QuickFilterControl
          render={({ ref, ...controlProps }, state) => (
            <StyledTextField
              {...controlProps}
              ownerState={{ expanded: state.expanded }}
              inputRef={ref}
              aria-label="Search"
              placeholder="Search..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                        material={{ sx: { marginRight: -0.75 } }}
                      >
                        <CancelIcon fontSize="small" />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...controlProps.slotProps?.input,
                },
                ...controlProps.slotProps,
              }}
            />
          )}
        />
      </StyledQuickFilter>
    </Toolbar>
  );
}

const Teachers = () => {
  const { data: teacherData, isLoading, isError } = useGetTeachersQuery();
  if (isLoading) return <LoadingSpinner color="pink" size="small" />;
  if (isError || !teacherData)
    return (
      <div>
        <NotFound />
      </div>
    );

  const columns: GridColDef[] = [
    { field: "id", headerName: "Teacher ID", width: 80 },
    { field: "username", headerName: "Username", width: 100, editable: true },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "surname", headerName: "Surname", width: 150, editable: true },
    { field: "birthday", headerName: "Birthday", width: 180, editable: true },
    { field: "email", headerName: "Email", width: 150, editable: true },
    { field: "phone", headerName: "Phone", width: 100, editable: true },
    { field: "address", headerName: "Address", width: 200, editable: true },
    { field: "bloodType", headerName: "Blood Type", width: 80, editable: true },
    { field: "sex", headerName: "Sex", width: 80, editable: true },
    {
      field: "subjects",
      headerName: "Subjects",
      width: 180,
      editable: true,
      renderCell: (cellValues: GridRenderCellParams<Subject>) => {
        return (
          <div>
            {cellValues.value.map((p: { name: any }) => p.name).join(", ") || []}
          </div>
        );
      },
    },
    {
      field: "lessons",
      headerName: "Lessons",
      width: 180,
      editable: true,
      renderCell: (cellValues: GridRenderCellParams<Lesson>) => {
        return (
          <div>
            {cellValues.value.map((p: { name: any }) => p.name).join(", ") || []}
          </div>
        );
      },
    },
    {
      field: "classes",
      headerName: "Classes",
      width: 180,
      renderCell: (cellValues: GridRenderCellParams<Class>) => {
        return (
          <div>
            {cellValues.value.map((p: { name: any }) => p.name).join(", ") || []}
          </div>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return <UserActions {...{ params }} />;
      },
    },
  ];

  return (
    <>
      <div className="pt-3">
        <TableHeader index={1} />
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={teacherData}
          columns={columns}
          editMode="row"
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          showToolbar
          className={dataGridClassNames}
        />
      </div>
    </>
  );
};
export default Teachers;
