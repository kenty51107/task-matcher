import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: string;
};

export type CreateTaskInput = {
  content?: InputMaybe<Scalars['String']>;
  schedule?: InputMaybe<Scalars['Time']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DeleteTaskInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask?: Maybe<Task>;
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

export type Query = {
  __typename?: 'Query';
  getTask: Task;
  getTasks: Array<Task>;
};


export type QueryGetTaskArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Task = {
  __typename?: 'Task';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Time']>;
  done?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  schedule?: Maybe<Scalars['Time']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Time']>;
};

export type UpdateTaskInput = {
  content?: InputMaybe<Scalars['String']>;
  done?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  schedule?: InputMaybe<Scalars['Time']>;
  title?: InputMaybe<Scalars['String']>;
};

export type GetTaskQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask: { __typename?: 'Task', id?: string | null, title?: string | null, content?: string | null, schedule?: string | null, done?: boolean | null, created_at?: string | null, updated_at?: string | null } };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', id?: string | null, title?: string | null, content?: string | null, schedule?: string | null, done?: boolean | null, created_at?: string | null, updated_at?: string | null }> };


export const GetTaskDocument = gql`
    query getTask($id: ID) {
  getTask(id: $id) {
    id
    title
    content
    schedule
    done
    created_at
    updated_at
  }
}
    `;
export const GetTasksDocument = gql`
    query getTasks {
  getTasks {
    id
    title
    content
    schedule
    done
    created_at
    updated_at
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getTask(variables?: GetTaskQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTaskQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaskQuery>(GetTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTask', 'query');
    },
    getTasks(variables?: GetTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksQuery>(GetTasksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTasks', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;