import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Head>
        <title>Reddit | Harshjohar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className='flex w-full'>
        <Feed />
      </div>
      
    </div>
  )
}

export default Home
