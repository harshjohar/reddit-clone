import { gql } from '@apollo/client'

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query Query($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query Query($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        id
        post_id
        text
        username
        created_at
      }
      votes {
        id
        post_id
        username
        upvote
        created_at
      }
    }
  }
`

export const GET_ALL_POSTS = gql`
  query Query {
    getPostList {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        id
        post_id
        text
        username
        created_at
      }
      votes {
        id
        post_id
        username
        upvote
        created_at
      }
    }
  }
`
export const GET_POST_BY_POST_ID = gql`
  query Query($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      subreddit {
        created_at
        id
        topic
      }
      comments {
        id
        post_id
        text
        username
        created_at
      }
      votes {
        id
        post_id
        username
        upvote
        created_at
      }
    }
  }
`

export const GET_SUBREDDIT_WITH_LIMIT = gql`
  query Query($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`