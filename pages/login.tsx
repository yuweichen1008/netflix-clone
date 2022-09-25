import Head from "next/head"
import Image from "next/image"

function Login() {
  return (
    <div className="relative flex h-screen w-screen bg-black">
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
      <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-20 md:max-w-md pd:px-14">
        <h1>Sign in</h1>
        <div className="space-y-4">
          <label>
            <input type="email" placeholder="Email"/>
          </label>
          <label>
            <input type="password" placeholder="Password" />
          </label>
        </div>
      </form>
    </div>
  )
}

export default Login