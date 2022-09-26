import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  email: string
  password: string
}

function Login() {

  const [login, setLogin] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  // const onSubmit: SubmitHandler<FormData> = data => console.log(data);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (login) {
      // await signIn(email, password)
    } else {
      // await signUp(email, password)
    }
  }


  return (
    <div className="relative flex h-screen w-screen bg-black md:bg-transparent md:items-center md:justify-center">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden sm:!inline opacity-60"
      />
      <img
        src='https://top10.netflix.com/images/logo.png'
        className="absolute left-6 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >

        <h1 className="text-4xl font-semibold">
          Sign in
        </h1>

        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              type="email"
              placeholder="Email"
              className="input"
            />
            {errors?.email &&
              <p className="p-1 font-light text-orange-500">
                {errors?.email.message}
              </p>
            }
          </label>
          <label className="inline-block w-full">
            <input
              {...register("password"), {
                required: true,
                minLength: 6,
                maxLength: 50,
              }}
              type="password"
              placeholder="Password"
              className="input"
            />
            {errors?.password &&
              <p className="p-1 font-light text-orange-500">
                The password must be length between 6 and 50 characters
              </p>
            }
          </label>
        </div>

        <button
          className="w-full rounded bg-red-600 py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign in
        </button>

        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login