import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="mx-auto my-7 max-w-6xl">
      <Head>
        <title>Reddit | Harshjohar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />
      
    </div>
  )
}

export default Home
