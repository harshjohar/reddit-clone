import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import client from '../Apollo/apollo-client'
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'

interface FormData {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

function PostBox() {
  const { data: session } = useSession()

  const [addPost] = useMutation(ADD_POST)
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [imageBoxOpen, setImageBoxOpen] = useState(false)

  const submitForm = handleSubmit(async (formData) => {
    console.log(formData)
    const notification = toast.loading("Creating new Post...")
    try {
      // query for the subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0

      if (!subredditExists) {
        // create subreddit
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
      } else {
        const image = formData.postImage || ''
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
      }

      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postTitle', '')
      setValue('subreddit', '')

      toast.success("New Post Created", {
        id: notification
      })
    } catch (error) {
      toast.error("Something went Wrong :(")
    }
  })
  return (
    <form
      className="sticky top-16 z-50 rounded-md border bg-white p-2"
      onSubmit={submitForm}
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? `Create a Post by entering a title!` : `Sign in to post`
          }
        />

        <PhotographIcon
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              type="text"
              placeholder="Text (optional)"
              {...register('postBody')}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              type="text"
              placeholder="i.e. helloworld"
              {...register('subreddit', { required: true })}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                type="text"
                placeholder="Optional"
                {...register('postImage')}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A post title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>- A subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
