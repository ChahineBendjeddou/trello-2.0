"use client";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import { fetchSuggestions } from "@/lib/fetchSuggestion";
const Header = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [suggestion, setSuggestion] = useState<String>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const fetchSuggestionsFunc = async () => {
      const suggestion = await fetchSuggestions(board);
      setSuggestion(suggestion);
      setLoading(false);
    };
    fetchSuggestionsFunc();
  }, [board]);

  return (
    <header>
      <div
        className="
          absolute 
          top-0
          left-0 
          w-full
          h-96
          bg-gradient-to-br
          from-pink-400
          to-[#0055d1] 
          rounded-md
          filter
          blur-3xl
          opacity-50
          -z-50
        "
      />
      <div className="flex flex-col items-center p-5 md:flex-row bg-gray-500/10 rounded-b-2xl">
        <Image
          src="/images/Logo_Trello.svg.png"
          alt="Trello Logo"
          width={300}
          height={100}
          className="object-contain pb-10 w-44 md:w-56 md:pb-0"
        />
        <div className="flex items-center justify-end flex-1 w-full space-x-5">
          <form className="flex items-center flex-1 p-2 space-x-5 bg-white rounded-md shadow-md md:flex-initial">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 p-2 outline-none"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="chahine bendjeddou" round color="#0055d1" size="56" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl p-5 text-[#0055d1]">
          <UserCircleIcon
            className={`${
              !loading && "hidden md:inline-block"
            } h-10 w-10 text-[#0055d1] mr-1 ${loading && "animate-spin"} `}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarising your tasks for the day..."}
        </p>
      </div>
    </header>
  );
};

export default Header;
