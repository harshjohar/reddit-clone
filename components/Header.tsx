import Image from 'next/image'
import React from 'react'
import {
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
function Header() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="https://links.papareact.com/fqy"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="mx-7 flex items-center">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-1 bg-transparent outline-none"
        />
        <button hidden type="submit"></button>
      </form>

      <div className="mx-5 hidden space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      {session ? (
        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => signOut()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src="https://links.papareact.com/23l" layout="fill" />
          </div>
          <div className='flex-1 text-xs'>
            <p className="hidden  lg:inline-flex truncate">
              {session?.user?.name}
            </p>
            <p className='text-gray-400'>69 Karma</p>
          </div>

          <ChevronDownIcon className='text-gray-400 h-5' />
        </div>
      ) : (
        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => signIn()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src="https://links.papareact.com/23l" layout="fill" />
          </div>

          <p className="hidden text-gray-400 lg:inline-flex">Sign In</p>
        </div>
      )}
    </div>
  )
}

export default Header
