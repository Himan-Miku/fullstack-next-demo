"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const Form = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const data = await fetch("/api/createPost", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const res = await data.json();
    router.refresh();
    setTitle("");
    if (!res.ok) console.log(res);
  };
  return (
    <div>
      <form className="flex gap-8 justify-center items-center">
        <input
          className="bg-gray-500 font-medium text-lg p-2 rounded-2xl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-teal-500 rounded-2xl text-black font-semibold px-4 py-2"
          type="submit"
          onClick={(e) => submitForm(e)}
        >
          Make a Post
        </button>
      </form>
    </div>
  );
};

export default Form;
