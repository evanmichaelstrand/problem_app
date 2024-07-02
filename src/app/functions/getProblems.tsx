//https://developer.dynatrace.com/reference/sdks/client-classic-environment-v2/#getproblems
import React, {useState, useEffect} from "react";
import { Flex, Heading, Paragraph, Strong, useCurrentTheme } from "@dynatrace/strato-components-preview";
import { problemsClient } from "@dynatrace-sdk/client-classic-environment-v2";
import { problemTitleColumns, problemAPColumns, problemEntityColumns } from "../components/table";
import { DataTable} from '@dynatrace/strato-components-preview/tables';
import {problemsByTitle, problemsByAP, problemsByEntity} from "../functions/problemFunctions";

const config: Object = {
    from: "now-14d",
}

export const UseProblemsAPI = () => {
    const [problems, setProblems] = useState<Object[]>([])
    const [problemCount, setProblemCount] = useState<String>()
    const [problemTitles, setProblemTitles] = useState<Object[]>([])
    const [problemAPs, setProblemAPs] = useState<Object[]>([])
    const [problemEntitys, setProblemEntitys] = useState<Object[]>([])
    useEffect(() => {
        problemsClient.getProblems(config)
        .then((response) => {
            if (response.problems) {
                setProblems(response.problems)
                setProblemCount(response.totalCount.toString())
                setProblemTitles(problemsByTitle(response.problems))
                setProblemAPs(problemsByAP(response.problems))
                setProblemEntitys(problemsByEntity(response.problems))
            }
            else {
                console.error("Issue with API call:", response)
            }
        })
      }, [])
      return (
        <>
            <Heading>Total Problem Count</Heading>
            <Heading>{problemCount}</Heading>
            
            <Heading>Problem Count by Problem Type</Heading>
            <DataTable columns={problemTitleColumns} data={problemTitles} sortable>
                <DataTable.Pagination defaultPageSize={10} defaultPageIndex={1} />
                <DataTable.Toolbar>
                    <DataTable.DownloadData />
                </DataTable.Toolbar>
            </DataTable>

            <Heading>Problem Count by Alerting Profile</Heading>
            <DataTable columns={problemAPColumns} data={problemAPs} sortable>
                <DataTable.Pagination defaultPageSize={10} defaultPageIndex={1} />
                <DataTable.Toolbar>
                    <DataTable.DownloadData />
                </DataTable.Toolbar>
            </DataTable>

            <Heading>Problem Count by Entity</Heading>
            <DataTable columns={problemEntityColumns} data={problemEntitys} sortable>
                <DataTable.Pagination defaultPageSize={10} defaultPageIndex={1} />
                <DataTable.Toolbar>
                    <DataTable.DownloadData />
                </DataTable.Toolbar>
            </DataTable>

        </>
      )
}


