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

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type DeleteTaskInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type DeleteUserInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  createUser: User;
  deleteTask?: Maybe<Task>;
  deleteUser?: Maybe<User>;
  updateTask: Task;
  updateUser: User;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getTask: Task;
  getTasks: Array<Task>;
  getUser: User;
  getUserByEmail: User;
  getUsers: Array<User>;
};


export type QueryGetTaskArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetTasksArgs = {
  orderBy: TaskOrderInput;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};

export enum SortOrientation {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

export enum TaskOrderField {
  CreatedAt = 'CREATED_AT',
  Schedule = 'SCHEDULE'
}

export type TaskOrderInput = {
  field: TaskOrderField;
  orientation: SortOrientation;
};

export type UpdateTaskInput = {
  content?: InputMaybe<Scalars['String']>;
  done?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  schedule?: InputMaybe<Scalars['Time']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  created_at?: Maybe<Scalars['Time']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Time']>;
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id?: string | null, title?: string | null, content?: string | null, schedule?: string | null, done?: boolean | null, created_at?: string | null, updated_at?: string | null } };

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id?: string | null, title?: string | null, content?: string | null, schedule?: string | null, done?: boolean | null, created_at?: string | null, updated_at?: string | null } };

export type GetTaskQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask: { __typename?: 'Task', id?: string | null, title?: string | null, content?: string | null, schedule?: string | null, done?: boolean | null, created_at?: string | null, updated_at?: string | null } };

export type GetTasksQueryVariables = Exact<{
  field: TaskOrderField;
  orientation: SortOrientation;
}>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', id?: string | null, title?: string | null, content?: string | null, schedule?: string | null, done?: boolean | null, created_at?: string | null, updated_at?: string | null }> };


export const CreateTaskDocument = gql`
    mutation createTask($input: CreateTaskInput!) {
  createTask(input: $input) {
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
export const UpdateTaskDocument = gql`
    mutation updateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
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
    query getTasks($field: TaskOrderField!, $orientation: SortOrientation!) {
  getTasks(orderBy: {field: $field, orientation: $orientation}) {
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
    createTask(variables: CreateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTaskMutation>(CreateTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTask', 'mutation');
    },
    updateTask(variables: UpdateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTaskMutation>(UpdateTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTask', 'mutation');
    },
    getTask(variables?: GetTaskQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTaskQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaskQuery>(GetTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTask', 'query');
    },
    getTasks(variables: GetTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksQuery>(GetTasksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTasks', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;