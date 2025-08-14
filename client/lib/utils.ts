export const dataGridClassNames =
  "border border-gray-200 bg-white shadow ";

export const dataGridSxStyles = () => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      '& [role="row"] > *': {
        backgroundColor: "white",
      },
    },
    "& .MuiDataGrid-cell": {
      border:"none"
    },
    "& .MuiDataGrid-row": {
      borderBottom: "1px solid #e5e7eb",
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: "#e5e7eb",
    },
  
  };
};
