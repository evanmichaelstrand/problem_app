import React, {useState, useEffect} from "react";
import { Flex, Heading, Paragraph, Strong, useCurrentTheme } from "@dynatrace/strato-components-preview";
import { problemsClient } from "@dynatrace-sdk/client-classic-environment-v2";
import { DataTable} from '@dynatrace/strato-components-preview/tables';
import {UseProblemsAPI} from "../functions/getProblems";

export const ProblemTable = () => {
    const problems = UseProblemsAPI()
      return (
        null
      )
}

class EntityObject {
  name: string;
  problemCount: number = 1;
}

/*function problemsByTitle(problems: Problem[]): [string, number][] {
  const problemDict: { [key: string]: number } = {};
  for (const problem of problems) {
      problemDict[problem.title] = (problemDict[problem.title] || 0) + 1;
  }
  return Object.entries(problemDict).sort((a, b) => b[1] - a[1]);
}
  */

//https://stackoverflow.com/questions/43338763/typescript-property-does-not-exist-on-type-object
export function problemsByTitle(problems: Array<any>) {
  const problemDict: { [key: string]: number } = {};
    for (const problem of problems) {
        problemDict[problem.title] = (problemDict[problem.title] || 0) + 1;
    }
    //https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
    const resultArray = Object.keys(problemDict).map(key => ({ title: key, count: problemDict[key] }));
    return resultArray;
}

export function problemsByAP(problems: Array<any>) {
  const APDict: { [key: string]: number } = {};
    for (const problem of problems) {
        for (const AP of problem.problemFilters) {
            APDict[AP.name] = (APDict[AP.name] || 0) + 1;
        }
    }
    const resultArray = Object.keys(APDict).map(key => ({ title: key, count: APDict[key] }));
    return resultArray;
}

export function problemsByEntity(problems: Array<any>) {
  const entityDict: { [key: string]: Array<any> } = {};
  for (const problem of problems) {
      for (const entity of problem.affectedEntities) {
        if (entity.entityId.id in entityDict) {
          entityDict[entity.entityId.id][1]++;
        }
        else{
          entityDict[entity.entityId.id] = new Array;
          entityDict[entity.entityId.id][0] = entity.name;
          entityDict[entity.entityId.id][1] = 1;
        }
      }
  }
    const resultArray = Object.keys(entityDict).map(key => ({ title: key, name: entityDict[key][0], count: entityDict[key][1] }));
    return resultArray;
}

/*
function problemsByEntity(problems: Problem[]): [string, EntityObject][] {
  const entityDict: { [key: string]: EntityObject } = {};
  for (const problem of problems) {
      for (const entity of problem.affectedEntities) {
          if (entity.entityId.id in entityDict) {
              entityDict[entity.entityId.id].problemCount++;
          } else {
              entityDict[entity.entityId.id] = new EntityObject();
              entityDict[entity.entityId.id].name = entity.name;
          }
      }
  }
  return Object.entries(entityDict).sort((a, b) => b[1].problemCount - a[1].problemCount);
}
  */