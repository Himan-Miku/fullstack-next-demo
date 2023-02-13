import { error } from "console";
import Link from "next/link";
import Form from "./Form";

type Posts = {
  id: number;
  title: string;
  content?: string;
  published?: boolean;
};

const fetchPosts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);
  if (!res.ok) {
    console.log(error);
  }
  return res.json();
};

export default async function Home() {
  const posts: Posts[] = await fetchPosts();
  console.log(posts);

  return (
    <main className="p-8">
      <Form />
      <div className="flex flex-col gap-8 justify-center items-center mt-6">
        <Link
          className="bg-teal-500 rounded-lg text-black font-semibold px-4 py-2"
          href={"/dashboard"}
        >
          Go to the dashboard
        </Link>
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-4 text-lg font-medium mt-6"
          >
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
