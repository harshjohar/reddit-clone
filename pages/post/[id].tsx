import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutations'
import toast from 'react-hot-toast'
import Avatar from '../../components/Avatar'
import TimeAgo from 'react-timeago'

type FormData = {
  comment: string
}

function PostPage() {
  const router = useRouter()
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.id,
    },
  })

  const { data: session } = useSession()

  const [insertComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId'],
  })

  const post: Post = data?.getPostByPostId

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notif = toast.loading('Posting your comment..')

    await insertComment({
      variables: {
        post_id: router.query.id,
        username: session?.user?.name,
        text: data.comment,
      },
    })
    setValue('comment', '')
    toast.success('Comment posted', {
      id: notif,
    })
  }
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        {session && (
          <p className="text-sm">
            Comment as{' '}
            <span className="text-red-500">{session?.user?.name}</span>
          </p>
        )}

        <form
          className="flex max-w-5xl flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register('comment')}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={session ? 'What are your thoughts?' : 'Please sign in'}
          />
          <button
            type="submit"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>

      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />

        {post?.comments.map((comment) => (
          <div
            key={comment.id}
            className="realtive flex items-center space-x-2 space-y-5"
          >
            <hr className="absolute top-10 left-7 z-0 h-16 border" />
            <div className="z-50 ">
              <Avatar seed={comment.username} />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {comment.username}
                </span>{' '}
                <TimeAgo date={comment.created_at} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage
