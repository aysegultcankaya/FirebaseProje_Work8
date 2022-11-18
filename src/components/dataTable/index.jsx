import React, { useEffect } from "react";
import { useTranslation } from "react-i18next"; //çeviri için kullnıldı.
import { useNavigate } from "react-router-dom"; //sayfalar arası geçiş için kullanıldı.
import PlusIcon from "@rsuite/icons/Plus";
import {
  Table,
  Pagination,
  TagPicker,
  Divider,
  SelectPicker,
  ButtonToolbar,
  Button,
  ButtonGroup,
  FlexboxGrid,
  IconButton,
} from "rsuite";
import { Reload } from "@rsuite/icons";

const { Column, HeaderCell, Cell } = Table; //tablonun özellikleri

const DataTable = (props) => {
  let {
    create = null,
    loading = false,
    size = "default",
    showHeader = true,
    hoverEffect = true,
    autoHeight = true,
    height = 300,
    bordered = true,
    cellBordered = true,
    rowKey = null,
    columns = null,
    pagination = true,
    data = [],
    rowClick = null,
    rowCount = 0,
    setPagination = null,
    refetch,
  } = props;

  const { t } = useTranslation(); //çeviri için t fonkksiyonu
  const history = useNavigate();

  const [pageSize, setPageSize] = React.useState(10); //sayfada kaç satır gösterileceği
  const [page, setPage] = React.useState(1); //hangi sayfada olduğumuz
  const [sortColumn, setSortColumn] = React.useState(); //hangi kolonun sıralandığını
  const [sortType, setSortType] = React.useState(); //sıralama tipi yukarıdan-aşağı
  const [compact, setCompact] = React.useState(
    size === "compact" ? "true" : "false"
  );

  const [columnKeys, setColumnKeys] = React.useState(
    columns.map((column) => column.name)
  );
  const newColumns = columns.filter((column) =>
    columnKeys.some((key) => key === column.name)
  );

  const [showColumns, setShowColumns] = React.useState(false);
  const [showDensity, setShowDensity] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);

  const sizes = [
    { label: t("general.table.compact"), value: "true" },
    { label: t("general.table.normal"), value: "false" },
  ];

  useEffect(() => {
    if (showDensity) {
      setShowColumns(false);
      setShowFilter(false);
    }
  }, [showDensity]);

  useEffect(() => {
    if (showFilter) {
      setShowColumns(false);
      setShowDensity(false);
    }
  }, [showFilter]);

  useEffect(() => {
    if (showColumns) {
      setShowFilter(false);
      setShowDensity(false);
    }
  }, [showColumns]);

  const createAction = (route) => {
    history(route);
  };

  /**
   * Sort data by column
   * @param {string} sortColumn
   * @param {string | undefined} sortType
   */
  const onSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    setPagination((prev) => ({
      ...prev,
      sorter: { field: sortColumn, type: sortType },
    }));
  };
  /**
   * An event trigger on page size change
   * @param {number} key
   */
  const onPageSizeChange = (key) => {
    setPage(1);
    setPageSize(key);
    setPagination((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, pageSize: key },
    }));
  };

  const onPageChange = (key) => {
    setPage(key);
    setPagination((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, page: key },
    }));
  };

  /**
   *
   * @param {Array} rowData
   */
  const onRowClick = (rowData) => {
    rowClick(rowData);
  };

  /**
   * Prepare Columns
   * @param {Array} columns
   * @returns JSX.Elements[]
   */
  const prepareColumns = (columns = []) => {
    return columns.map(
      (
        {
          title = null,
          name = null,
          type = "text",
          align = "center",
          sortable = false,
          colspan = null,
          flexGrow = null,
          minWidth = 200,
          rowSpan = null,
          treeCol = null,
          verticalAlign = null,
          width = null,
          fixed = null,
          resizable = false,
          onResize,
          renderCell,
        },
        index
      ) => (
        <Column
          align={align}
          sortable={sortable}
          colSpan={colspan}
          flexGrow={width ? null : flexGrow || index}
          minWidth={minWidth}
          key={index}
          width={width}
          verticalAlign={verticalAlign}
          rowSpan={rowSpan}
          treeCol={treeCol}
          fixed={fixed}
          resizable={resizable}
          onResize={onResize}
        >
          <HeaderCell style={compact === "true" && { padding: 4 }}>
            {title}
          </HeaderCell>
          <Cell dataKey={name} style={compact === "true" && { padding: 4 }}>
            {renderCell || null}
          </Cell>
        </Column>
      )
    );
  };

  const refresh = () => {
    if (refetch) refetch();
  };

  if (!columns) return null;

  return (
    <>
      <ButtonToolbar style={{ textAlign: "right" }}>
        {create && (
          <ButtonGroup>
            <IconButton
              onClick={() => createAction(create)}
              size="md"
              icon={<PlusIcon />}
            >
              {t("general.table.createAction")}
            </IconButton>
          </ButtonGroup>
        )}
        {refetch && (
          <IconButton onClick={() => refresh()} size="md" icon={<Reload />} />
        )}
      </ButtonToolbar>
      <Divider />
      <ButtonToolbar style={{ textAlign: "right", marginTop: 10 }}>
        <ButtonGroup>
          <Button onClick={() => setShowFilter(!showFilter)} size="md">
            {t("general.table.showFilter")}
          </Button>
          <Button onClick={() => setShowColumns(!showColumns)} size="md">
            {t("general.table.showHideColumns")}
          </Button>
          <Button onClick={() => setShowDensity(!showDensity)} size="md">
            {t("general.table.showDensity")}
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <FlexboxGrid
        style={{ justifyContent: "end", marginTop: 10, marginBottom: 10 }}
      >
        {showColumns && (
          <TagPicker
            data={columns}
            labelKey="title"
            valueKey="name"
            value={columnKeys}
            onChange={setColumnKeys}
            cleanable={false}
          />
        )}
        {showDensity && (
          <SelectPicker
            searchable={false}
            data={sizes}
            style={{ width: 100 }}
            cleanable={false}
            value={compact}
            onChange={setCompact}
          />
        )}
      </FlexboxGrid>
      {/* <Divider style={{ margin: "5px 0px 10px 0px" }} /> */}
      <Table
        data={data}
        loading={loading}
        showHeader={showHeader}
        rowKey={rowKey}
        height={height}
        headerHeight={compact === "true" ? 30 : 40}
        rowHeight={compact === "true" ? 30 : 46}
        hoverEffect={hoverEffect}
        autoHeight={autoHeight}
        // fillHeight={fillHeight}
        bordered={bordered}
        cellBordered={cellBordered}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={onSortColumn}
        affixHorizontalScrollbar
        onRowClick={onRowClick}
      >
        {prepareColumns(newColumns)}
      </Table>
      <div style={{ padding: 20 }}>
        {pagination && (
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={rowCount}
            limitOptions={[5, 10, 30, 50, 100]}
            limit={pageSize}
            activePage={page}
            onChangePage={onPageChange}
            onChangeLimit={onPageSizeChange}
          />
        )}
      </div>
    </>
  );
};

export default DataTable;
