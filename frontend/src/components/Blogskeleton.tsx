import { Circle } from "./BlogCard"
export const Blogskeleton = () => {
    return <div>

        <div role="status" className="max-w-sm animate-pulse">
            <div className="border-b border-slate-200 p-4 leading-10 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">

                    <div className="flex items-center">
                        <div className=" pl-2">
                            <div className="flex items-center justify-center mt-4">
                                <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                                <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                                <div className={"flex justify-center flex-col pl-2 pt-0.5"}>
                                    <Circle />
                                </div>
                                <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>


                        </div>
                    </div>
                    <div className="text-2xl font-semibold pl-2 pt-2">
                        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                    </div>
                    <div className="text-base font-thin pl-2">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                    </div>
                    <div className="text-slate-500 text-sm font-thin pl-2 pt-4">
                        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
}

