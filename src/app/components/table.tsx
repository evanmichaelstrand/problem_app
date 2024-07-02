import React, {useState, useEffect} from "react";
import { units } from '@dynatrace-sdk/units';
import { DataTable, TableColumn } from '@dynatrace/strato-components-preview/tables';

export const problemTitleColumns: TableColumn[] = [
    {
      header: 'Problem Title',
      accessor: 'title',
      autoWidth: true
    },
    {
      header: 'Problem Count',
      accessor: 'count',
      autoWidth: true
    }
];

export const problemAPColumns: TableColumn[] = [
  {
    header: 'Alerting Profile',
    accessor: 'title',
    autoWidth: true
  },
  {
    header: 'Problem Count',
    accessor: 'count',
    autoWidth: true
  }
];

export const problemEntityColumns: TableColumn[] = [
  {
    header: 'ID',
    accessor: 'title',
    autoWidth: true
  },
  {
    header: 'Name',
    accessor: 'name',
    autoWidth: true
  },
  {
    header: 'Problem Count',
    accessor: 'count',
    autoWidth: true
  }
];