import React from "react";

function Login() {
  return (
    <div>
      <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-800">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-purple-300 absolute a-z-10 -left-20 -top-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="a"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.6) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    stroke-width="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#a)"
              />
            </svg>
          </div>
          <div className="hidden sm:block h-28 w-28 text-purple-300 absolute a-z-10 -right-20 -bottom-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="b"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.5) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    stroke-width="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#b)"
              />
            </svg>
          </div>
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-700 border-1 bg-gray-800 shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-purple-500 no-underline hover:text-purple-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">
                    AIVA.
                  </span>
                </a>
              </div>
              <h4 className="mb-2 font-medium text-gray-50 xl:text-xl">
                Welcome to AIVA!
              </h4>
              <p className="mb-6 text-gray-50">
                Admin please sign-in to access your account
              </p>

              <form id="" className="mb-4" action="#" method="POST">
                <div className="mb-4">
                  <label
                    for="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-100"
                  >
                    Email or Username
                  </label>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-purple-500 focus:bg-white focus:text-gray-600 focus:shadow text-gray-50"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
                    autofocus=""
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-100"
                      for="password"
                    >
                      Password
                    </label>
                    <a
                      href="auth-forgot-password-basic.html"
                      className="cursor-pointer text-purple-500 no-underline hover:text-purple-500"
                    >
                      <small className=" ">Forgot Password?</small>
                    </a>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-purple-500 focus:bg-white focus:text-gray-600 focus:shadow text-gray-50"
                      name="password"
                      placeholder="············"
                    />
                  </div>
                </div>
                <div className="mb-4"></div>
                <div className="mb-4">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-purple-500 bg-purple-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-purple-600 hover:bg-purple-600 hover:text-white focus:border-purple-600 focus:bg-purple-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
