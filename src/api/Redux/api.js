import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const base_url = 'https://jsonplaceholder.typicode.com/';
// fire-brigade-control-rooms-muncipal all blocks
// fire-brigade-control-rooms-muncipal all blocks= (block name)

export const Apidata = createApi({
  reducerPath: 'Apidata',
  baseQuery: fetchBaseQuery({baseUrl: base_url}),
  endpoints: builder => ({
    GetPostList: builder.query({
      query: body => ({
        url: `photos`,
        method: 'GET',
      }),
    }),
    GetfriendsList: builder.query({
      query: body => ({
        url: `users`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetPostListQuery, useGetfriendsListQuery} = Apidata;
