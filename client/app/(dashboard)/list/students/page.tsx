/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  ToolbarButton,
  Toolbar,
  QuickFilter,
  ExportPrint,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  QuickFilterTrigger,
  ExportCsv,
  QuickFilterControl,
  QuickFilterClear,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  TextField,
  Typography,
  Menu,
  Tooltip,
  Badge,
  MenuItem,
  InputAdornment,
  Divider,
} from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import NotFound from "@/app/(components)/Error";
import LoadingSpinner from "@/app/(components)/Loading";
import TableHeader from "@/app/(components)/TableHeader";
import { Parent, useGetStudentsQuery } from "@/state/api";
import StudentActions from "@/app/(components)/Users/StudentActions";
// import { Parent} from "@prisma/client";

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
      <Typography fontWeight="bold" sx={{ flex: 1, mx: 0.5 }}>
        STUDENTS
      </Typography>
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
const Students = () => {
  const { data: studentData, isLoading, isError } = useGetStudentsQuery();
  if (isLoading) return <LoadingSpinner color="pink" size="small" />;
  // if (isError) return <NotFound />;
  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 120,
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 120,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 90,

    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "class_name",
      headerName: "Class",
      width:70,
    },
    {
      field: "parent",
      headerName: "Parent Phone Number",
      width: 150,
      renderCell: (cellValues: GridRenderCellParams<Parent>) => {
        return (
          <div>{cellValues.value.map((p:{phone:any}) => p.phone) || []}</div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return <StudentActions {...{ params }} />;
      },
    },
  ];
  return (
    <>
      {/* Header */}
      <div className="">
        <TableHeader index={2} />
      </div>
      <div style={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={studentData}
          showToolbar
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
          pagination
        />
      </div>
    </>
  );
};

export default Students;
