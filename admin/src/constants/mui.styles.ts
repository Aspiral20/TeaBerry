import MUIScrollbarStyles from "../_utils/mui_scrollbar.styles";

export const dataGridStyles = {
  ['& .MuiDataGrid-cell:hover, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within,' +
  ' & .MuiDataGrid-columnHeader:hover, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within']: {
    outline: 'none'
  },
  '& .css-i4bv87-MuiSvgIcon-root': {
    fill: 'var(--theme-mode-text-color)'
  },
  '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator .MuiSvgIcon-root': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon .MuiButtonBase-root': {
    color: 'var(--theme-mode-text-color)'
  },
  '& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer .MuiButtonBase-root': {
    color: 'var(--theme-mode-text-color)'
  },
  '& .MuiDataGrid-withBorderColor': {
    borderColor: 'rgba(var(--MUI-products-data-grid-border-color-opacity), .2)'
  },
  '& .MuiTablePagination-root .MuiTablePagination-displayedRows': {
    color: 'var(--theme-mode-text-color)'
  },
  //Scrollbar
  ...MUIScrollbarStyles(
    '& .MuiDataGrid-main .MuiDataGrid-virtualScroller',
    7,
    'var(--MUI-data-grid-track-color)',
    'block',
    'var(--MUI-data-grid-thumb-color)',
    30
  ),
  '& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-cellContent': {
    fontSize: '14px',
  },
  '.css-1ps6pg7-MuiPaper-root': {
    backgroundColor: 'var(--theme-mode-content-bg)'
  },
  '& .MuiDataGrid-overlay': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '& .MuiDataGrid-virtualScroller': {
    zIndex: 0,
  },
  borderColor: "rgba(var(--MUI-products-data-grid-border-color-opacity), .2)",
  color: "var(--theme-mode-text-color)",
  fontSize: '14px',
}